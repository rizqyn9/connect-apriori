import { useState } from 'react'
import { useModal } from '../context/modal-context'
import { useAxiosPrivate } from './useAxiosPrivate'

function useTransaction() {
    const [process, setProcess] = useState(false)
    const { activatedModal } = useModal()
    const axiosPrivate = useAxiosPrivate()

    const newTransaction = async (data) => {}

    const transactionParser = (data, cb) => {
        const order = Object.entries(data.orders).map(([a, b]) => {
            delete b.image
            return { [a]: b }
        })

        if (cb) cb({ order, ...data.transaction })
    }

    return { newTransaction, transactionProcess: process, transactionParser }
}

export { useTransaction }
