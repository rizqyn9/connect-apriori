import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import { transactionProps } from "@/types/transaction.schema"
import { mongoObject } from "../types/misc.schema"
import { TransactionModel } from "@/models"
import { z } from "zod"
import { createNewCustomer, findByCardId } from "@/controller/customer.controller"

const app = Router()

const orderListValidation = z.array(
  z.object({
    menuId: z.string(),
    variants: z.object({
      hot: z.number().optional(),
      ice: z.number().optional(),
      promo: z.number().optional(),
    }),
  })
)

/* ------------------------- Create new transaction ------------------------- */
app.post("/", async (req, res) => {
  const { orderList, ...rest } = req.body
  const transactionParse = transactionProps.omit({ orders: true }).parse(rest)

  const orders = orderListValidation.parse(orderList)

  let customer = null
  if (transactionParse.cardId) {
    // console.log("New Promo")

    if (
      await findByCardId(transactionParse.cardId)
        .then(Boolean)
        .catch(() => false)
    )
      throw new Error("Customer already registered")

    customer = await createNewCustomer({
      cardId: transactionParse.cardId,
    })
  }

  const transaction = new TransactionModel({
    customerId: customer?._id || null,
    paymentMethod: transactionParse.paymentMethod,
    promo: transactionParse.promo || null,
    price: transactionParse.price,
    orders: orders.map((order) => ({
      productId: order.menuId,
      hot: order.variants.hot,
      ice: order.variants.ice,
      quantity: (order.variants.hot || 0) + (order.variants.ice || 0),
    })),
  })

  await transaction.save()

  res.json({
    msg: "Success create transaction",
  })
})

/* --------------------------- Remove Transaction --------------------------- */
app.delete("/:id", async (req, res, next) => {
  const id = mongoObject.parse(req.params.id)
  await transactionController.remove(id).then((val) => res.json({ payload: val }))
})

export default app
