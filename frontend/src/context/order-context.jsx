import * as React from 'react'
import { isValidElement } from 'react'

export const ORDER = Object.freeze({
    ADD: 1,
    REMOVE: 2,
    UPDATE: 3,
})

const OrderContext = React.createContext({})

export function OrderProvider({ children }) {
    const [orders, setOrders] = React.useState({})

    React.useEffect(() => {
        console.log('Order changes :', orders)
    }, [orders])

    function addOrder(data) {
        let id = `${data.type}-${data.id}`
        let parse = { ...data }
        if (orders[id]) {
            parse.quantity = orders[id].quantity + 1
        } else {
            parse.quantity = 1
        }
        setOrders({
            ...orders,
            [id]: {
                ...parse,
            },
        })
    }

    function removeOrder(id) {
        let res = orders
        delete res[id]
        setOrders({ ...res })
    }

    function updateOrder(id, data) {
        setOrders({ ...orders, [id]: { ...orders[id], ...data } })
    }

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                removeOrder,
                updateOrder,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => React.useContext(OrderContext)
