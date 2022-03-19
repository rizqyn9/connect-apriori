import React from 'react'
import { atom, useAtom } from 'jotai'

const orderAtom = atom({})

function useOrder() {
    const [orders, setOrders] = useAtom(orderAtom)

    const addOrder = (id, data) => {
        if (orders[id] && orders[id].type == data.type) {
            updateQuantity(id, true)
        } else {
            setOrders({ ...orders, [id]: { ...data, quantity: 1 } })
        }
        console.log(orders)
    }

    const removeOrder = (id) => {
        let data = orders
        delete data[id]
        setOrders({ ...data })
    }

    const updateQuantity = (id, isAdd) => {
        let val = orders[id]
        if (isAdd) {
            setOrders({
                ...orders,
                [id]: { ...val, quantity: val.quantity + 1 },
            })
        } else {
            if (val.quantity === 1) return removeOrder(id)
            else
                setOrders({
                    ...orders,
                    [id]: { ...val, quantity: val.quantity - 1 },
                })
        }
    }

    const setNotes = (id, note) => {
        setOrders({ ...orders, [id]: { ...orders[id], note } })
    }

    return { orders, addOrder, removeOrder, updateQuantity, setNotes }
}

export { orderAtom, useOrder }
