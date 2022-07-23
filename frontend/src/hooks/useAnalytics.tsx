import create from 'zustand'
import { axiosPrivate } from '../services'

export type AnalyticsDataProps = {
    products: Array<unknown>
    transactions: Array<unknown>
    promos: Array<unknown>
}

type AnalyticsStore = {
    getProducts(): Promise<AnalyticsDataProps['products']>
    getTransactions(): Promise<AnalyticsDataProps['transactions']>
    getPromos(): Promise<AnalyticsDataProps['promos']>
    getAllAnalytics(): Promise<unknown>
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
        return axiosPrivate.get('/analytics').then((val) => console.log(val))
        // return { products, transactions, promos }
    },
}))

export { useAnalyticsStore }
