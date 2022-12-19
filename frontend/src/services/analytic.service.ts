import { axiosPrivate } from '.'

const PRODUCT_STRUCTURE = {
  _id: 'ID',
  menu: 'Menu',
  price: 'Price',
  order: 'Order',
}

const getAnalyticsData = async () => {
  const { status, data } = await axiosPrivate.get('/analytics')
  if (status !== 200) throw new Error('Failed')
  console.log({ data })

  return data
}

export const anaylyticService = { getAnalyticsData }
