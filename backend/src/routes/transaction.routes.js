import TransactionModel from "../models/Transaction.model.js"
import responses from "../utils/responses.js"
import { parseOrder } from "../lib/parseOrder.js"
import * as transactionController from "../controller/transaction.controller.js"
import * as productController from "../controller/product.controller.js"

import express from "express"
import { isValidKeyRequest, isValidObjectId } from "../utils/index.js"
const app = express.Router()

/**
 * Ambil semua transaksi
 */
app.get("/", async (req, res) => {
  try {
    await transactionController
      .getAll()
      .then((val) => responses.success(res, val, "Transactions"))
  } catch (error) {
    if (error instanceof Error) responses.fail(res, {}, error.message)
    else responses.error(res, "Server error")
  }
})

/**
 * Buat Transaksi baru
 */
app.post("/new", async (req, res) => {
  try {
    isValidKeyRequest(["orders", "transaction"], req)
    const { orders, transaction } = req.body
    console.log(orders, transaction)

    const parsedOrder = parseOrder(orders)

    // Update total order menu
    const listOrderId = await Promise.all(
      Object.entries(parsedOrder).map(([key, val]) =>
        productController.incrementOrderById(key, val.quantity)
      )
    )
    // .then(async (val) => {
    //   return await TransactionModel.create({
    //     orderList: val.map((data) => data._id),
    //     price: transaction.price,
    //     paymentMethod: transaction.paymentMethod,
    //     promo: isValidObjectId(transaction.promo, false) || null,
    //     discount: transaction.discount,
    //   })
    //     .then((data) => data)
    //     .catch((err) => {
    //       console.log(err)
    //       throw new Error("Transaction cant created")
    //     })
    // })
    // .catch((err) => {
    //   console.log(err)
    //   throw new Error("Update product error")
    // })

    console.log(listOrderId)

    return responses.success(res, req.body)
  } catch (error) {
    if (error instanceof Error) responses.fail(res, {}, error.message)
    else responses.error(res, "Server error")
  }
})

export default app
