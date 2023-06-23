import { z } from "zod"

const menuType = z.enum(["hot", "ice"])

export type MenuType = z.infer<typeof menuType>

const orderProps = z
  .object({
    productId: z.string(),
    quantity: z.number(),
  })
  .and(z.record(menuType, z.number()))

export type OrderProps = z.infer<typeof orderProps>

export const transactionProps = z.object({
  paymentMethod: z.string(),
  cardId: z.string().optional().nullable(),
  price: z.number(),
  promo: z.object({}).nullable(),
  orders: z.array(orderProps),
})

export type TransactionProps = z.infer<typeof transactionProps>
