import create from 'zustand'
import { useOrderStore } from './useOrder'

export const paymentMethodExist = ['dana', 'ovo', 'gopay'] as const

export type PaymentMethod = typeof paymentMethodExist[number]

/* ---------------- Recalculate every order data has changed ---------------- */
useOrderStore.subscribe(() => useTransactionStore.getState().recalculate())

const useTransactionStore = create<TransactionStore>((set, get) => ({
    state: 'order',
    props: {
        method: null,
        total: 0,
        promo: null,
    },
    setProps(key, val) {
        const { props } = get()
        set({ props: { ...props, [key]: val } })
    },
    recalculate() {
        let count = Object.entries(useOrderStore.getState().orders)
            .map(([key, order], i) => order.price * order.quantity)
            .reduce((prev, curr) => prev + curr, 0)
        get().setProps('total', count)
    },
    clearTransaction() {
        set({
            props: {
                method: null,
                total: 0,
                promo: null,
            },
        })
    },
    async create() {},
}))

export { useTransactionStore }
