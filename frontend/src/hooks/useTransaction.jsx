import { useState } from 'react'
import { useAxiosPrivate } from './useAxiosPrivate'

function useTransaction() {
    const [process, setProcess] = useState(false)
    const axiosPrivate = useAxiosPrivate()

    const newTransaction = async (data) => {
        setProcess(true)
        try {
            const order = Object.entries(data.orders).map(([a, b]) => {
                delete b.image
                return { [a]: b }
            })
            console.table({ order, ...data.transaction })
            return await axiosPrivate
                .post('/transaction/new', data)
                .then((val) => console.log(val))
        } catch (error) {
        } finally {
            setProcess(false)
        }
    }

    return { newTransaction, transactionProcess: process }
}

export { useTransaction }
