import TransactionModel from "../models/Transaction.model.js"
import responses from "../utils/responses.js"
import { parseOrder } from "../lib/parseOrder.js"
import { updateOneProduct } from "../lib/analytics.js"
import ProductModel from "../models/Product.model.js"
import mongoose from "mongoose"

import express from "express"
const app = express.Router()

/**
 * Ambil semua transaksi
 */
app.get("/", async (req, res) => {
  TransactionModel.find().then((val, err) => {
    if (val) return responses.success(res, { transaction: val })
    else {
      console.log(err)
      return responses.fail(res, "Fail")
    }
  })
})

/**
 * Buat Transaksi baru
 */
app.post("/new", async (req, res) => {
  try {
    const { orders, transaction } = req.body

    console.log(orders, transaction)

    if (!Array.isArray(orders))
      return responses.forbidden(res, "Data order not valid")

    const parsedOrder = parseOrder(orders)

    // Update total order menu
    const listOrderId = await Promise.all(
      Object.entries(parsedOrder).map(([key, val]) =>
        ProductModel.findByIdAndUpdate(key, {
          $inc: { totalOrdered: val.quantity },
        })
      )
    )
      .then(async (val) => {
        return await TransactionModel.create({
          orderList: val.map((data) => data._id),
          price: transaction.price,
          paymentMethod: transaction.paymentMethod,
          promo: mongoose.isValidObjectId(transaction.promo)
            ? transaction.promo
            : null,
          discount: transaction.discount,
        })
          .then((data) => data)
          .catch((err) => {
            console.log(err)
            throw new Error("Transaction cant created")
          })
      })
      .catch((err) => {
        console.log(err)
        throw new Error("Update product error")
      })

    console.log(listOrderId)

    return responses.success(res, req.body)
  } catch (error) {
    console.log(error)
    return responses.error(res, "err")
  }
})

export default app
