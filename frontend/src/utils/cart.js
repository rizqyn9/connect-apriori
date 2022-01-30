import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

let dummy = {
    ['id']: {
        quantity: 1,
        notes: '',
    },
}

export function useOrder() {
    const [orders, setOrders] = useState({})
    const [priceTotal, setPriceTotal] = useState(0)

    useEffect(() => {
        // let priceCalc =
        console.log('render', orders)
    }, [orders])

    const addOrder = (data) => {
        let id = `${data.type}-${data.id}`
        setOrders((val) => {
            return { ...val, [id]: data }
        })
    }

    const test = () => {
        console.log('test')
    }

    return { test, addOrder, orders, setOrders, priceTotal, setPriceTotal }
}
