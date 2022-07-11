import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type OrderStore = {
    orders: Record<string, OrderProps>
    addOrder: (id: string, order: Omit<OrderProps, 'quantity'>) => void
    removeOrder: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    setNotes: (id: string, note: string | null) => void
    clearOrders: () => void
}

export type UseOrderStoreReturn = ReturnType<typeof useOrderStore>
const useOrderStore = create<OrderStore>()(
    devtools(
        persist(
            (set, get) => ({
                orders: {},
                addOrder(id, orderProps) {
                    const { orders, updateQuantity } = get()
                    if (!orders[id]) {
                        set({
                            orders: {
                                ...orders,
                                [id]: { ...orderProps, quantity: 1 },
                            },
                        })
                    } else updateQuantity(id, +1)
                },
                removeOrder(id) {
                    const { orders } = get()
                    delete orders[id]
                    set({ orders })
                },
                updateQuantity(id, updateValue) {
                    const { orders, removeOrder } = get()
                    if (orders[id]) {
                        const target = orders[id]
                        target.quantity += updateValue
                        if (target.quantity <= 0) {
                            return removeOrder(id)
                        } else {
                            return set({ ...orders, [id]: target })
                        }
                    }
                },
                setNotes(id, note) {
                    const { orders } = get()
                    let target = orders[id]
                    if (target && note) {
                        target = { ...target, note }
                        set({ orders: { ...orders, [id]: { ...target } } })
                    }
                },
                clearOrders() {
                    const { orders } = get()
                    set({ orders })
                },
            }),
            {
                name: 'order',
            },
        ),
    ),
)

export { useOrderStore }
