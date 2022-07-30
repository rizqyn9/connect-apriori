import { Router } from "express"
import * as transactionController from "@/controller/transaction.controller"
import * as productController from "@/controller/product.controller"
import z from "zod"
import {
  CreateSchema,
  OrderSchema,
  orderSchema,
  transactionSchema,
} from "@/utils/schema"
import { createSchema } from "../utils/schema"
import mongoose from "mongoose"

const app = Router()

/* -------------------------- Get all transactions -------------------------- */
app.get("/", async (req, res, next) => {
  try {
    await transactionController
      .getAll()
      .then((payload) => res.json({ payload }))
  } catch (error) {
    next(error)
  }
})

/* ------------------------- Create new transaction ------------------------- */
app.post("/create", async (req, res, next) => {
  try {
    const validator = createSchema.safeParse(req.body)

    if (!validator.success) throw new Error("Request not falid")

    const { orders, transaction } = validator.data

    const mapQuantity = new Map<string, OrderSchema>()

    Object.entries(orders).forEach(([_, val]) => {
      if (mapQuantity.has(val._id)) {
        const current = mapQuantity.get(val._id)!
        mapQuantity.set(val._id, {
          ...current,
          quantity: current.quantity + val.quantity,
        })
      } else mapQuantity.set(val._id, val)
    })

    /* --------------------- Update quantity ordered product -------------------- */
    const updateProduct = await Promise.all(
      Array.from(mapQuantity.values()).map((val) => {
        return productController.incrementOrderById(val._id, val.quantity)
      })
    )

    /* --------------------------- Create transaction --------------------------- */
    const transactionModel = await transactionController.create({
      orderList: updateProduct.map((val) => val._id),
      price: transaction.total,
      paymentMethod: transaction.method,
    })

    res.json({
      msg: "Success create transaction",
      payload: transactionModel,
    })
  } catch (error) {
    console.log({ error })

    next(error)
  }
})

export default app
