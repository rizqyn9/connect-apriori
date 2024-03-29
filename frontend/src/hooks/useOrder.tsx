import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { OrderProps } from '../types'

export type KeyUIState = 'choose product' | 'choose payment' | 'payment'

export type OrderStore = {
  cardId?: string | null
  setCardId: (cardId: string) => void
  removeCardId: () => void
  isPromoExist: () => boolean
  orders: Record<string, OrderProps>
  addOrder(id: string, order: Omit<OrderProps, 'quantity'>): void
  removeOrder(id: string): void
  updateQuantity(id: string, quantity: number): void
  setNotes(id: string, note: string | null): void
  clearOrders(): void
  state: KeyUIState
  updateState(state: KeyUIState): void
  reset(): void
}

const useOrderStore = create<OrderStore>()(
  devtools(
    persist(
      (set, get) => ({
        reset() {
          set({
            state: 'choose product',
            cardId: null,
            orders: {},
          })
        },
        cardId: null,
        setCardId(cardId) {
          set({ cardId })
        },
        removeCardId() {
          set({ cardId: null })
        },
        isPromoExist() {
          const { orders } = get()

          return false
        },
        orders: {},
        addOrder(id, orderProps) {
          const { orders, updateQuantity } = get()
          if (!orders[id]) {
            const order = { ...orderProps, quantity: 1 }
            set({ orders: { ...orders, [id]: order } })
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
          set({ orders: {} })
        },
        state: 'choose product',
        updateState(state) {
          set({ state })
        },
      }),
      {
        name: 'order',
      },
    ),
  ),
)

export { useOrderStore }
