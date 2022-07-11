import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

let dummy = {
    ['id']: {
        quantity: 1,
        notes: '',
    },
}

const OrdersContext = atom({})

function useOrder() {
    const [orders, setOrders] = useAtom(OrdersContext)
    const [priceTotal, setPriceTotal] = useState(0)

    useEffect(() => {
        console.log(orders)
    }, [orders])

    const addOrder = (data) => {
        let id = `${data.type}-${data.id}`
        setOrders({ ...orders, [id]: data })
    }

    console.log('orders ctx')
    return { addOrder, orders, setOrders, priceTotal, setPriceTotal }
}
