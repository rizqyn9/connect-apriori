import mongoose from "mongoose"

const TransactionModel = new mongoose.Schema({
  orderList: [
    {
      type: mongoose.Schema.Types.ObjectId,
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
    type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model("Transactions", TransactionModel)
