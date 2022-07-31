import { z } from 'zod'
import { paymentAllowed } from './misc.schema'

const menuType = z.enum(['hot', 'ice'])

export type MenuType = z.infer<typeof menuType>

const orderSchema = z.object({
    menuId: z.string().min(1),
    variants: z.record(menuType, z.number()),
})

export type OrderSchema = z.infer<typeof orderSchema>

export const transactionSchema = z.object({
    paymentMethod: paymentAllowed,
    price: z.number(),
    promo: z.object({}).nullable(),
    customerId: z.string().min(1).nullable(),
    orderList: z.array(orderSchema), // Order list
})

export type TransactionSchema = z.infer<typeof transactionSchema>
