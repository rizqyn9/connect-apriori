const TransactionModel = require("../models/Transaction.model")
const responses = require("../utils/responses")
const { parseOrder } = require("../lib/parseOrder")
const { updateOneProduct } = require("../lib/analytics")
const ProductModel = require("../models/Product.model")

const app = require("express").Router()

/**
 * Ambil semua transaksi
 */
app.get("/", (req, res) => {
  return responses.success(res, "Success")
})

/**
 * Buat Transaksi baru
 */
app.post("/new", async (req, res) => {
  const processedData = {}
  try {
    const { orders, transaction } = req.body

    console.log(orders, transaction)

    if (!Array.isArray(orders))
      return responses.forbidden(res, "Data order not valid")

    const parsedOrder = parseOrder(orders)

    const promises = []

    Object.entries(parsedOrder).forEach(([key, val]) => {
      promises.push(
        ProductModel.findByIdAndUpdate(key, {
          $inc: { totalOrdered: val.quantity },
        })
      )
    })

    await Promise.all(promises)

    return responses.success(res, req.body)
  } catch (error) {
    console.log(error)
    return responses.error(res, "err")
  }
})

module.exports = app
