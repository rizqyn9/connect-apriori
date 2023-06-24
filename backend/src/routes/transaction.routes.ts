import { Router } from "express"
import { TransactionModel } from "@/models"
import { z } from "zod"
import { createNewCustomer, findByCardId } from "@/controller/customer.controller"
import { Product } from "@/models/product"
import { PromoModel } from "@/models/promo"

const app = Router()

const requestValidator = z.object({
  paymentMethod: z.string(),
  price: z.number(),
  cardId: z.string().nullable().catch(null),
  orderList: z.array(
    z.object({
      menuId: z.string(),
      variants: z.object({
        hot: z.number().catch(0),
        ice: z.number().catch(0),
        promo: z.number().catch(0),
      }),
    })
  ),
})

async function validateCardId(cardId: string) {
  const custExist = await findByCardId(cardId)
    .then(Boolean)
    .catch(() => false)
  if (custExist) throw new Error("Customer already registered")

  return await createNewCustomer({
    cardId,
  })
}

/* ------------------------- Create new transaction ------------------------- */
app.post("/", async (req, res) => {
  const { cardId, paymentMethod, orderList, price } = requestValidator.parse(req.body)

  let customer = null
  if (cardId) {
    customer = await validateCardId(cardId)
  }

  const promo = orderList.filter((y) => !!y.variants.promo)

  const transaction = new TransactionModel({
    customerId: customer?._id || null,
    paymentMethod,
    promo: promo[0]?.menuId,
    price,
  })

  await Promise.all(
    orderList.map(async (order) => {
      return await Product.findById(order.menuId).then(async (product) => {
        if (product) {
          const { hot, ice, promo } = order.variants
          const quantity = hot + ice + promo
          const priceAmount = quantity * product.price
          transaction.orders.push({
            productId: order.menuId,
            menu: product.menu,
            hot,
            ice,
            type: promo > 0 ? "promo" : "regular",
            quantity,
            priceAmount,
            price: product.price,
          })
        } else if (order.variants.promo) {
          await PromoModel.findById(order.menuId).then((x) => {
            if (!x) return
            const { hot, ice, promo } = order.variants
            const quantity = hot + ice + promo
            const priceAmount = quantity * x.price
            transaction.orders.push({
              productId: order.menuId,
              menu: x.menu,
              hot,
              ice,
              type: "promo",
              quantity,
              priceAmount,
              price: x.price,
            })
          })
        }
      })
    })
  )

  await transaction.save()

  res.json({ msg: "Success create transaction" })
})

export default app

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

async function seed() {
  const products = await Product.find({})
  const trxs = []

  for (let i = 100; i > 0; i--) {
    const trx = new TransactionModel({
      customerId: null,
      promoId: null,
      paymentMethod: "tunai",
    })

    let price = 0

    for (let i = getRandomIntInclusive(1, 5); i > 0; i--) {
      const choosePrd = products[getRandomIntInclusive(0, products.length - 1)]!
      const hot = getRandomIntInclusive(0, 2)
      const ice = getRandomIntInclusive(1, 2)
      const quantity = hot + ice
      const priceAmount = quantity * choosePrd.price

      price += quantity * choosePrd.price

      trx.orders.push({
        menu: choosePrd.menu,
        productId: choosePrd._id,
        hot,
        ice,
        type: "regular",
        quantity,
        priceAmount,
        price: choosePrd.price,
      })
    }

    trx.price = price
    trxs.push(trx)
  }

  return await TransactionModel.bulkSave(trxs)
}
