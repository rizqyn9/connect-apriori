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
