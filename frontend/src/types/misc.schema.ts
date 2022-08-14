import { z } from 'zod'

export const paymentAllowed = z.enum(['gopay', 'ovo', 'tunai', 'dana'])

export type PaymentAllowed = z.infer<typeof paymentAllowed>
