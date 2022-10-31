import { z } from "zod"
import { paymentAllowed } from "./misc.schema"

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
  paymentMethod: paymentAllowed,
  customerId: z.string().nullable(),
  price: z.number(),
  promo: z.object({}).nullable(),
  orders: z.array(orderProps),
})

export type TransactionProps = z.infer<typeof transactionProps>
