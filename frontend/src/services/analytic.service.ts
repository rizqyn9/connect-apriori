import { z } from 'zod'
import { axiosPrivate } from '.'

const productOrderValidator = z.object({
  productId: z.string(),
  menu: z.string(),
  ice: z.number(),
  hot: z.number(),
  quantity: z.number(),
  type: z.enum(['regular', 'promo']),
})

export const transactionValidator = z.object({
  _id: z.string(),
  customerId: z.string().nullable().catch(null),
  promoId: z.string().nullable(),
  paymentMethod: z.string(),
  price: z.coerce.number(),
  orders: z.array(productOrderValidator),
  createdAt: z.coerce.date(),
})

const resSchema = z.object({
  transactions: z.array(transactionValidator),
})

export type GetAnalyticsData = z.infer<typeof resSchema>

async function getAnalyticsData() {
  const { status, data } = await axiosPrivate.get('/analytics')
  if (status !== 200) throw new Error('Failed')
  const validated = resSchema.safeParse(data.payload)
  if (!validated.success)
    throw new Error('Validate error', {
      cause: validated.error,
    })

  return validated.data
}

export const anaylyticService = { getAnalyticsData }
