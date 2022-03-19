import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useAxiosPrivate } from './useAxiosPrivate'
import { useOrder } from './useOrder'

const transactionAtom = atom({
    price: 0,
    paymentMehod: null,
    discount: 0,
    promo: '',
})

/**
 * Tipe Pembayaran yang disupport
 */
const transactionVariants = [
    { type: 'DANA' },
    { type: 'OVO' },
    { type: 'GOPAY' },
]

function useTransaction() {
    const { orders } = useOrder()
    const [transaction, setTransaction] = useAtom(transactionAtom)
    const [process, setProcess] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {
        updatePrice()
    }, [orders])

    const createTransaction = async (data) => {
        setProcess(true)
        try {
            console.log(data)
            return await axiosPrivate
                .post('/transaction/new', data)
                .then((val) => {
                    console.log(val)
                })
        } catch (error) {
            console.log(error)
        } finally {
            setProcess(false)
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

    return {
        createTransaction,
        transactionProcess: process,
        transactionParser,
        transaction,
        setTransaction,
        updatePrice,
        setPaymentMethod,
        transactionVariants,
    }
}

export { useTransaction }
