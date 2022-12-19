import { Schema, Types, model } from "mongoose"
import type { TransactionProps, OrderProps } from "@/types/transaction.schema"

const OrderSchema = new Schema<OrderProps>({
  // @ts-expect-error
  productId: { type: Types.ObjectId, ref: "product" },
  ice: { type: Number, default: 0 },
  hot: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
})

const TransactionSchema = new Schema<TransactionProps>(
  {
    customerId: { type: Types.ObjectId, ref: "customer", default: null },
    promo: { type: Types.ObjectId, ref: "promo" },
    paymentMethod: { type: String },
    price: { type: Number },
    orders: [OrderSchema],
  },
  { timestamps: true }
)

export const OrderModel = model("order", OrderSchema)
export const TransactionModel = model("transaction", TransactionSchema)
