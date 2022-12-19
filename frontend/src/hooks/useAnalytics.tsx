import create from 'zustand'
import { axiosPrivate } from '../services'
import { ProductProps, Transaction } from '../types'

export type AnalyticsDataProps = {
  products: Array<ProductProps>
  transactions: Array<Transaction>
  promos: Array<unknown>
}

type AnalyticsStore = {
  getProducts(): Promise<AnalyticsDataProps['products']>
  getTransactions(): Promise<AnalyticsDataProps['transactions']>
  getPromos(): Promise<AnalyticsDataProps['promos']>
  getAllAnalytics(): Promise<AnalyticsDataProps>
}

const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  async getProducts() {
    return []
  },
  async getTransactions() {
    return []
  },
  async getPromos() {
    return []
  },
  async getAllAnalytics() {
    return axiosPrivate.get<{ payload: AnalyticsDataProps }>('/analytics').then((res) => {
      const { payload } = res.data
      // console.log({ payload })
      return payload
    })
  },
}))

export { useAnalyticsStore }
