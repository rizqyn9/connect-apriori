import * as React from 'react'
import { useState } from 'react'

const OrderContext = React.createContext({})

const inititalTransaction = {
    priceTotal: 0,
    paymentType: '',
}

export function OrderProvider({ children }) {
    const [transaction, setTransaction] = useState(inititalTransaction)
    const [orders, setOrders] = React.useState({})

    React.useEffect(() => {
        updateTransaction()
    }, [orders])

    function updateTransaction() {
        let total = 0
        for (const key in orders) {
            total += orders[key].quantity * orders[key].price
        }
        return setTransaction({ ...transaction, priceTotal: total })
    }

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
        console.log(data)
        setOrders({ ...orders, [id]: { ...orders[id], ...data } })
    }

    function updatePaymentType(typePaymentParam) {
        setTransaction({ ...transaction, paymentType: typePaymentParam })
    }

    function resetOrder() {}

    return (
        <OrderContext.Provider
            value={{
                orders,
                addOrder,
                removeOrder,
                updateOrder,
                // Transaction Function
                transaction,
                setTransaction,
                updatePaymentType,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => React.useContext(OrderContext)
