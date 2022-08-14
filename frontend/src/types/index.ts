import { PaymentMethod } from '../hooks/useTransaction'
export type ProductProps = {
    _id: string
    menu: string
    price: number
    imageURL: string
}

export type ProductStore = {
    products: ProductProps[]
    getAllProducts(): Promise<void>
    getProductId(id: string): Promise<ProductProps>
    postProduct<T extends unknown>(product: T): Promise<unknown>
}

export type CardProductProps = ProductProps & {
    activeCard: boolean
    setActiveCard: (id: string) => void
}

export type MenuType = 'hot' | 'ice'

export type OrderProps = ProductProps & {
    orderId: string
    quantity: number
    menuType: MenuType
    note?: string
}

export type TransactionProps = {
    method: PaymentMethod | null
    total: number
    promo: null
}

export type KeyTransactionProps = keyof TransactionProps

export type TransactionStore = {
    state: 'order' | 'create' | 'success' | 'fail'
    props: TransactionProps
    setProps<TKey extends KeyTransactionProps = KeyTransactionProps>(key: TKey, val: TransactionProps[TKey]): void
    recalculate(): void
    create(): Promise<unknown>
    clearTransaction(): void
    doPaid(): Promise<void>
}

export * from './misc.schema'
export * from './order.schema'
export * from './person.schema'
export * from './product.schema'
export * from './transaction.schema'
