import { Router } from "express"
import { TransactionModel } from "@/models"
import { z } from "zod"
import { createNewCustomer, findByCardId } from "@/controller/customer.controller"
import { Product } from "@/models/product"

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

  console.log(orderList)

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
      await Product.findById(order.menuId).then((product) => {
        if (!product) return
        const { hot, ice, promo } = order.variants
        transaction.orders.push({
          productId: order.menuId,
          menu: product.menu,
          hot,
          ice,
          type: promo > 0 ? "promo" : "regular",
          quantity: promo + ice + hot,
        })
      })
    })
  )

  await transaction.save()

  res.json({ msg: "Success create transaction" })
})

export default app
