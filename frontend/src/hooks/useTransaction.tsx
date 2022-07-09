import create from 'zustand'
import { useOrderStore, UseOrderStoreReturn } from './useOrder'

const initialTransaction = {
    price: 0,
    paymentMehod: null,
    discount: 0,
    promo: '',
}

export const paymentMethodExist = ['dana', 'ovo', 'gopay'] as const

type TransactionProps = {
    method: PaymentMethod | null
    total: number
    promo: null
}

type KeyTransactionProps = keyof TransactionProps

export type PaymentMethod = typeof paymentMethodExist[number]
export type TransactionStore = {
    state: 'order' | 'create' | 'success' | 'fail'
    orderStore: UseOrderStoreReturn
    props: TransactionProps
    setProps: <TKey extends KeyTransactionProps = KeyTransactionProps>(
        key: TKey,
        val: TransactionProps[TKey],
    ) => void
    recalculate: () => void
}

const useTransactionStore = create<TransactionStore>((set, get) => ({
    state: 'order',
    orderStore: useOrderStore.getState(),
    props: {
        method: null,
        total: 0,
        promo: null,
    },
    setProps(key, val) {
        const { props } = get()
        set({ props: { ...props, [key]: val } })
    },
    recalculate() {},
}))

// function useTransaction() {
//     const { orders, clearOrders } = useOrder()
//     const [transaction, setTransaction] = useAtom(transactionAtom)
//     const [transactionState, setTransactionState] = useState(
//         TransactionStateType.ORDER,
//     )

//     const axiosPrivate = useAxiosPrivate()

//     useEffect(() => {
//         updatePrice()
//     }, [orders])

//     const createTransaction = async () => {
//         setTransactionState(TransactionStateType.CREATE)
//         try {
//             let orderWithoutImg = Object.entries(orders).map(([key, val]) => {
//                 return { ...val, image: undefined, variantWithID: key }
//             })

//             // const prom = new Promise((res, rej) =>
//             //     setTimeout(() => res(), 5000)
//             // )
//             // await prom

//             return await axiosPrivate
//                 .post('/transaction/new', {
//                     orders: orderWithoutImg,
//                     transaction,
//                 })
//                 .then((res) => {
//                     setTransactionState(TransactionStateType.SUCCESS)
//                     console.log(res)
//                     return res
//                 })
//         } catch (error) {
//             console.log(error)
//             setTransactionState(TransactionStateType.FAIL)
//         }
//     }

//     const transactionParser = (data, cb) => {
//         const order = Object.entries(data.orders).map(([a, b]) => {
//             delete b.image
//             return { ...b }
//         })
//         console.log(order)

//         if (cb) cb({ order, transaction: data.transaction })
//     }

//     const updatePrice = () => {
//         let price = 0
//         Object.entries(orders).map(([key, data]) => {
//             price += data.price * data.quantity
//         })
//         setTransaction({ ...transaction, price })
//     }

//     const setPaymentMethod = (paywith = null) => {
//         setTransaction({ ...transaction, paymentMehod: paywith })
//     }

//     const clearTransactionAndOrder = () => {
//         clearOrders()
//         setTransactionState(TransactionStateType.ORDER)
//         setTransaction(initialTransaction)
//     }

//     return {
//         createTransaction,
//         clearTransactionAndOrder,
//         transactionParser,
//         transaction,
//         setTransaction,
//         updatePrice,
//         setPaymentMethod,
//         transactionVariants,
//         transactionState,
//         setTransactionState,
//         TransactionStateType,
//     }
// }

export { useTransactionStore }
