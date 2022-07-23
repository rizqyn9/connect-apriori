import create from 'zustand'

type AnalyticsStore = {
    getProducts(): Promise<Array<unknown>>
    getTransaction(): Promise<Array<unknown>>
    getPromo(): Promise<Array<unknown>>
}

const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
    async getProducts() {
        return []
    },
    async getTransaction() {
        return []
    },
    async getPromo() {
        return []
    },
}))

export { useAnalyticsStore }
