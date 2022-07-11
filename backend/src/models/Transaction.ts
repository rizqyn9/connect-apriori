import { Schema, Types, model } from "mongoose"

export type TransactionProps = {
  price: number
  paymentMethod: string
  customerId: Types.ObjectId
  orderList: Types.ObjectId[]
  promo: Types.ObjectId
  discount: number
  created_at?: Date
}

const TransactionModel = new Schema<TransactionProps>({
  customerId: {
    type: Types.ObjectId,
    ref: "Customers",
  },
  orderList: [
    {
      type: Types.ObjectId,
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
    type: Types.ObjectId,
    ref: "Promos",
  },
  discount: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

export default model("Transactions", TransactionModel)
