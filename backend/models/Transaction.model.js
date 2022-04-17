const { Schema, model } = require("mongoose")

const TransactionModel = new Schema({
  orderList: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  promo: {
    type: String,
    required: false,
  },
  discount: {
    type: Number,
  },
  creted_at: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = model("Transactions", TransactionModel)
