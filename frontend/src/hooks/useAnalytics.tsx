import { atom, useAtom } from 'jotai'
import { useAxiosPrivate } from './useAxiosPrivate'

const analyticsAtom = atom({
    transactionList: [],
})

function useAnalytics() {
    const [analytics, setAnalytics] = useAtom(analyticsAtom)

    const axiosPrivate = useAxiosPrivate()

    const getAllTransaction = async () => {
        return await axiosPrivate
            .get('/transaction')
            .then((val) => val.data.transaction)
    }

    return {
        analytics,
        getAllTransaction,
    }
}

export { useAnalytics }
