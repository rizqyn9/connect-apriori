import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useAxiosPrivate } from './useAxiosPrivate'
import { useOrder } from './useOrder'

const initialTransaction = {
    price: 0,
    paymentMehod: null,
    discount: 0,
    promo: '',
}
const transactionAtom = atom(initialTransaction)

/**
 * Tipe Pembayaran yang disupport
 */
const transactionVariants = [
    { type: 'DANA' },
    { type: 'OVO' },
    { type: 'GOPAY' },
]

/**
 * state flow : order => creating => success | fail
 */

const TransactionStateType = Object.freeze({
    ORDER: 1,
    CREATE: 2,
    SUCCESS: 3,
    FAIL: 4,
})

function useTransaction() {
    const { orders, clearOrders } = useOrder()
    const [transaction, setTransaction] = useAtom(transactionAtom)
    const [transactionState, setTransactionState] = useState(
        TransactionStateType.ORDER
    )

    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        updatePrice()
    }, [orders])

    const createTransaction = async () => {
        setTransactionState(TransactionStateType.CREATE)
        try {
            let orderWithoutImg = Object.entries(orders).map(([key, val]) => {
                return { ...val, image: undefined, variantWithID: key }
            })

            // const prom = new Promise((res, rej) =>
            //     setTimeout(() => res(), 5000)
            // )
            // await prom

            return await axiosPrivate
                .post('/transaction/new', {
                    orders: orderWithoutImg,
                    transaction,
                })
                .then((res) => {
                    setTransactionState(TransactionStateType.SUCCESS)
                    console.log(res)
                    return res
                })
        } catch (error) {
            console.log(error)
            setTransactionState(TransactionStateType.FAIL)
        }
    }

    const transactionParser = (data, cb) => {
        const order = Object.entries(data.orders).map(([a, b]) => {
            delete b.image
            return { ...b }
        })
        console.log(order)

        if (cb) cb({ order, transaction: data.transaction })
    }

    const updatePrice = () => {
        let price = 0
        Object.entries(orders).map(([key, data]) => {
            price += data.price * data.quantity
        })
        setTransaction({ ...transaction, price })
    }

    const setPaymentMethod = (paywith = null) => {
        setTransaction({ ...transaction, paymentMehod: paywith })
    }

    const clearTransactionAndOrder = () => {
        clearOrders()
        setTransactionState(TransactionStateType.ORDER)
        setTransaction(initialTransaction)
    }

    return {
        createTransaction,
        clearTransactionAndOrder,
        transactionParser,
        transaction,
        setTransaction,
        updatePrice,
        setPaymentMethod,
        transactionVariants,
        transactionState,
        setTransactionState,
        TransactionStateType,
    }
}

export { useTransaction }
