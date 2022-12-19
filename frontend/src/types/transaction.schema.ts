import { PaymentAllowed } from './misc.schema'
export type Transaction = {
  _id: string
  paymentMethod: PaymentAllowed
  price: number
  customerId?: string
  promo: null
  created_at: string
  orderList: TransactionOrderItem[]
}

type TransactionOrderItem = {
  variants: {
    ice: number
    hot: number
  }
  menuId: string
  _id: string
}
