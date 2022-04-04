import React from 'react'
import { atom, useAtom } from 'jotai'

const orderAtom = atom({})

function useOrder() {
    const [orders, setOrders] = useAtom(orderAtom)

    const addOrder = (orderID, data) => {
        if (orders[orderID] && orders[orderID].type == data.type) {
            updateQuantity(orderID, true)
        } else {
            setOrders({ ...orders, [orderID]: { ...data, quantity: 1 } })
        }
    }

    const removeOrder = (orderID) => {
        setOrders((data) => {
            delete data[orderID]
            return { ...data }
        })
    }

    const updateQuantity = (orderID, isAdd) => {
        let val = orders[orderID]
        if (isAdd) {
            setOrders({
                ...orders,
                [orderID]: { ...val, quantity: val.quantity + 1 },
            })
        } else {
            if (val.quantity === 1) return removeOrder(orderID)
            else
                setOrders({
                    ...orders,
                    [orderID]: { ...val, quantity: val.quantity - 1 },
                })
        }
        console.log(orders)
    }

    const setNotes = (orderID, note) => {
        setOrders({ ...orders, [orderID]: { ...orders[orderID], note } })
    }

    const clearOrders = () => {
        setOrders({})
    }

    return {
        orders,
        addOrder,
        removeOrder,
        updateQuantity,
        setNotes,
        clearOrders,
    }
}

export { orderAtom, useOrder }
