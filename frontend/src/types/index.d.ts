type ProductProps = {
    _id: string
    menu: string
    price: number
    imageURL: string
}

type ProductStore = {
    products: ProductProps[]
    getAllProducts: () => Promise<void>
}

type CardProductProps = ProductProps & {
    activeCard: boolean
    setActiveCard: (id: string) => void
}

type MenuType = 'hot' | 'ice'

type OrderProps = ProductProps & {
    orderId: string
    quantity: number
    menuType: MenuType
    note?: string
}

type TransactionProps = {
    method: PaymentMethod | null
    total: number
    promo: null
}

type KeyTransactionProps = keyof TransactionProps

type TransactionStore = {
    state: 'order' | 'create' | 'success' | 'fail'
    props: TransactionProps
    setProps: <TKey extends KeyTransactionProps = KeyTransactionProps>(
        key: TKey,
        val: TransactionProps[TKey],
    ) => void
    recalculate: () => void
}
