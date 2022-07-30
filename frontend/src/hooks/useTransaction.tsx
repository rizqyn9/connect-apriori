import create from 'zustand'
import { axiosPrivate } from '../services'
import { useOrderStore } from './useOrder'
import { useProductStore } from './useProducts'
import { MenuType, OrderSchema } from '../types/order.schema'

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

        const parsed = Object.values(orders).reduce((prev, curr) => {
            let exist: OrderSchema | undefined = prev.get(curr._id)

            if (!exist) return prev.set(curr._id, { menuId: curr._id, variants: { [curr.menuType]: curr.quantity } })
            else return prev.set(curr._id, { ...exist, variants: { ...exist.variants, [curr.menuType]: curr.quantity } })
        }, new Map<string, OrderSchema>())

        const payload = {
            paymentMethod: props.method,
            price: props.total,
            promo: props.promo,
            customerId: null, // TODO
            orderList: [...parsed.values()],
        }

        return await axiosPrivate.post('/transaction', { ...payload }).then((val) => val.data)
    },
}))

export { useTransactionStore }
