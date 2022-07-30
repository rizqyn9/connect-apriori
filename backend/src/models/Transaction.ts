import { Schema, Types, model } from "mongoose"
import type { TransactionSchema } from "@/types/transaction.schema"

const OrderModel = new Schema<TransactionSchema["orderList"][number]>({
  menuId: {
    type: Types.ObjectId,
    ref: "Product",
  },
  menuType: { type: String, required: true },
  quantity: { type: Number, required: true },
})

const TransactionModel = new Schema<TransactionSchema & { created_at?: Date }>({
  paymentMethod: { type: String },
  price: { type: Number },
  customerId: {
    type: Types.ObjectId,
    ref: "Customers",
  },
  promo: {
    type: Types.ObjectId,
    ref: "Promos",
  },
  orderList: [OrderModel],
  created_at: {
    type: Date,
    default: Date.now(),
  },
})

export default model("Transactions", TransactionModel)
