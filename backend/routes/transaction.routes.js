const TransactionModel = require("../models/Transaction.model")
const responses = require("../utils/responses")
const { parseOrder } = require("../lib/parseOrder")
const { updateOneProduct } = require("../lib/analytics")
const ProductModel = require("../models/Product.model")

const app = require("express").Router()

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
  const processedData = {}
  try {
    const { orders, transaction } = req.body

    console.log(orders, transaction)

    if (!Array.isArray(orders))
      return responses.forbidden(res, "Data order not valid")

    const parsedOrder = parseOrder(orders)

    // Update total order menu
    const promises = []
    Object.entries(parsedOrder).forEach(([key, val]) =>
      promises.push(
        ProductModel.findByIdAndUpdate(key, {
          $inc: { totalOrdered: val.quantity },
        })
      )
    )
    await Promise.all(promises)

    await TransactionModel.create({
      orderList: orders,
      price: transaction.price,
      paymentMethod: transaction.paymentMethod,
      promo: transaction.promo,
      discount: transaction.discount,
    }).then((success, err) => {
      if (err) return console.log(err)
      else console.log(success)
    })

    return responses.success(res, req.body)
  } catch (error) {
    console.log(error)
    return responses.error(res, "err")
  }
})

module.exports = app
