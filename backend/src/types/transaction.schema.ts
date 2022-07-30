import { z } from "zod"
import { mongoObject, paymentAllowed } from "./misc.schema"

const orderSchema = z.object({
  quantity: z.number(),
  menuId: mongoObject,
  menuType: z.enum(["hot", "ice"]),
})

export type OrderSchema = z.infer<typeof orderSchema>

export const transactionSchema = z.object({
  paymentMethod: paymentAllowed,
  price: z.number(),
  promo: z.object({}).nullable(),
  customerId: mongoObject.nullable(),
  orderList: z.array(orderSchema), // Order list
})

export type TransactionSchema = z.infer<typeof transactionSchema>
