import { Schema, Types, model } from "mongoose"
import { z } from "zod"

const productOrderValidator = z.object({
  productId: z.string(),
  menu: z.string(),
  ice: z.string(),
  hot: z.string(),
  type: z.enum(["regular", "promo"]),
})

export const transactionValidator = z.object({
  customerId: z.string().nullable().catch(null),
  promoId: z.string().nullable(),
  paymentMethod: z.string(),
  price: z.coerce.number(),
  orders: z.array(productOrderValidator),
})

const OrderSchema = new Schema({
  productId: { type: Types.ObjectId, required: true },
  menu: { type: String, required: true },
  ice: { type: Number, default: 0 },
  hot: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  type: { type: String, enum: productOrderValidator.shape.type.options, required: true },
  priceAmount: { type: Number, default: 0 },
  price: { type: Number, default: 0 },
})

const TransactionSchema = new Schema(
  {
    customerId: { type: Types.ObjectId, default: null },
    promoId: { type: Types.ObjectId, default: null },
    paymentMethod: { type: String, required: true },
    price: { type: Number, required: true },
    orders: {
      type: [OrderSchema],
      default: [],
    },
  },
  { timestamps: true }
)

const DB_TRANSACTION = "transaction"

export const TransactionModel = model(DB_TRANSACTION, TransactionSchema, DB_TRANSACTION)
export const Transaction = TransactionModel
