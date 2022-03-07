import { useState } from 'react'
import { useModal } from '../context/modal-context'
import { useAxiosPrivate } from './useAxiosPrivate'

function useTransaction() {
    const [process, setProcess] = useState(false)
    const { activatedModal } = useModal()
    const axiosPrivate = useAxiosPrivate()

    const createTransaction = async () => {
        setProcess(true)
        setTimeout(() => setProcess(false), 4000)
    }

    const transactionParser = (data, cb) => {
        const order = Object.entries(data.orders).map(([a, b]) => {
            delete b.image
            return { [a]: b }
        })

        if (cb) cb({ order, transaction: data.transaction })
    }

    return { createTransaction, transactionProcess: process, transactionParser }
}

export { useTransaction }
