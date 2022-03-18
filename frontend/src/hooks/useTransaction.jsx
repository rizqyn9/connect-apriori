import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useModal } from '../context/modal-context'
import { useAxiosPrivate } from './useAxiosPrivate'
import { orderAtom, useOrder } from './useOrder'

const transactionAtom = atom({
    price: 0,
    paymentMehod: null,
    discount: 0,
    promo: '',
})

function useTransaction() {
    const { orders } = useOrder()
    const [transaction, setTransaction] = useAtom(transactionAtom)
    const [process, setProcess] = useState(false)
    const { activatedModal } = useModal()
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

    return {
        createTransaction,
        transactionProcess: process,
        transactionParser,
        transaction,
        setTransaction,
        updatePrice,
    }
}

export { useTransaction }
