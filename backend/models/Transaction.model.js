const { Schema, model } = require("mongoose")

const TransactionModel = new Schema({
  orderList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  price: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  promo: {
    type: Schema.Types.ObjectId,
    ref: "Promos",
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
