import { z } from 'zod'
import { axiosPrivate } from '.'

const productSchema = z.object({
  _id: z.string(),
  imageUrl: z.string().catch(''),
  menu: z.string(),
  price: z.number(),
  totalOrdered: z.number(),
})

const transactionSchema = z.object({
  _id: z.string(),
  createdAt: z.string().datetime(),
  customerId: z.string().nullable().catch(null),

  orders: z.array(
    z.object({
      productId: z.string(),
      ice: z.number().catch(0),
      hot: z.number().catch(0),
      quantity: z.number().catch(0),
    }),
  ),
  paymentMethod: z.string(),
  price: z.number(),
  promo: z.string().nullable().catch(null),
})

const resSchema = z.object({
  products: z.array(productSchema),
  transactions: z.array(transactionSchema),
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
