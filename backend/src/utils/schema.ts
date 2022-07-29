import * as z from "zod"

export const transactionSchema = z.object({
  method: z.enum(["dana", "ovo", "gopay", "tunai"]),
  total: z.number(),
  promo: z.string().optional().nullable(),
})

export type TransactionSchema = z.infer<typeof transactionSchema>

export const orderSchema = z.object({
  orderId: z.string(),
  menuType: z.enum(["hot", "ice"]),
  price: z.number(),
  _id: z.string(),
  quantity: z.number(),
})

export type OrderSchema = z.infer<typeof orderSchema>

export const createSchema = z.object({
  transaction: transactionSchema,
  orders: z.record(z.string(), orderSchema),
})

export type CreateSchema = z.infer<typeof createSchema>
