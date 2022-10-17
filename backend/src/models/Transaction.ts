import { Schema, Types, model } from "mongoose"
import type { TransactionSchema, OrderSchema } from "@/types/transaction.schema"

const OrderModel = new Schema<OrderSchema>({
  menuId: {
    type: Types.ObjectId,
    ref: "Product",
  },
  variants: {
    ice: { type: Number, default: 0 },
    hot: { type: Number, default: 0 },
  },
})

const TransactionModel = new Schema<TransactionSchema & { created_at?: Date }>(
  {
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
    orderList: {
      type: [OrderModel],
      default: [],
    },
  },
  { timestamps: true }
)

export default model("Transactions", TransactionModel)
