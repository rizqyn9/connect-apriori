import { Schema, Types, model } from "mongoose"
import { z } from "zod"

const DB_CUSTOMER = "customer"

const customerSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  cardId: {
    type: String,
    required: true,
    unique: true,
  },
  transactions: [
    {
      type: Types.ObjectId,
      default: [],
      required: false,
    },
  ],
})

export const Customer = model(DB_CUSTOMER, customerSchema, DB_CUSTOMER)

export const validatorCustomer = z.object({
  name: z.string().optional().catch(undefined),
  cardId: z.string().min(1),
})
