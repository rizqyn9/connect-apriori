import { useState } from 'react'
import { useModal } from '../context/modal-context'
import { useAxiosPrivate } from './useAxiosPrivate'

function useTransaction() {
    const [process, setProcess] = useState(false)
    const { activatedModal } = useModal()
    const axiosPrivate = useAxiosPrivate()

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

    return { createTransaction, transactionProcess: process, transactionParser }
}

export { useTransaction }
