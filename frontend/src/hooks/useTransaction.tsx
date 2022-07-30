import create from 'zustand'
import { axiosPrivate } from '../services'
import { useOrderStore } from './useOrder'
import { useProductStore } from './useProducts'

export const paymentMethodExist = ['dana', 'ovo', 'gopay', 'tunai'] as const

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
    async doPaid() {
        const { props } = get()
        const orders = useOrderStore.getState().orders

        const payload = {
            paymentMethod: props.method,
            price: props.total,
            promo: props.promo,
            customerId: null, // TODO
            orderList: [
                ...Object.entries(orders).map(([key, order]) => ({
                    quantity: order.quantity,
                    menuId: order._id,
                    menuType: order.menuType,
                })),
            ],
        }
        return await axiosPrivate
            .post('/transaction', { ...payload })
            .then((val) => console.log(val))
            .catch((err) => console.log(err))
    },
}))

export { useTransactionStore }
