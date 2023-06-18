import { z } from 'zod'

export const paymentAllowed = z.enum(['tunai', 'non-tunai'])

export type PaymentAllowed = z.infer<typeof paymentAllowed>
