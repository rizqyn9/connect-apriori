import { axiosPrivate } from '.'
import { useProductStore } from '../hooks/useProducts'
import { ProductProps } from '../types'
import { ProductInputSchema } from '../utils/zod.schema'

const getAll = async () => {
  const { data, status } = await axiosPrivate.get<{ payload: ProductProps[] }>('/products')
  if (status === 200) {
    useProductStore.setState({ products: data.payload })
    return { success: true }
  }
  return { invalid: true }
}

const create = async (payload: ProductInputSchema) => {
  const { status, data } = await axiosPrivate.post('/products', payload)
  if (status !== 200) return { invalid: true }
  console.log({ payload })
  return data
}

const findId = async (id: string) => {
  const { status, data } = await axiosPrivate.get<{ payload: ProductProps }>(`/products/${id}`)
  if (status !== 200) throw new Error('Not found')
  return { product: data.payload }
}

const edit = async (payload: ProductInputSchema & { id: string }) => {
  const { status, data } = await axiosPrivate.post(`/products/${payload.id}`, payload)
  if (status !== 200) throw new Error('Failed to update')
  console.log({ data })
  return data
}

type ResProductsPromo = {
  productsList: ProductProps[]
  price: number
  menu: string
  imageUrl: string
  _id: string
}
const productPromo = async () => {
  const { data } = await axiosPrivate.get<{ products: ResProductsPromo[] }>('/promo')
  return { products: data.products }
}

const remove = async (productId: string) => {
  const { data } = await axiosPrivate.delete('/products/' + productId)
  return data
}

export const productService = { getAll, create, findId, edit, productPromo, remove }
