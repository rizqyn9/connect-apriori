import { axiosPrivate } from '.'
import { useOrderStore } from '@/hooks/useOrder'
import { useTransactionStore } from '@/hooks/useTransaction'
import { OrderSchema } from '@/types'

const create = async () => {
    const props = useTransactionStore.getState().props
    const orders = useOrderStore.getState().orders

    console.log({ orders })
    const parsed = Object.values(orders).reduce((prev, curr) => {
        let exist: OrderSchema | undefined = prev.get(curr._id)

        if (!exist) return prev.set(curr._id, { menuId: curr._id, variants: { [curr.menuType]: curr.quantity } })
        else return prev.set(curr._id, { ...exist, variants: { ...exist.variants, [curr.menuType]: curr.quantity } })
    }, new Map<string, OrderSchema>())

    const payload = {
        paymentMethod: props.method,
        price: props.total,
        promo: props.promo,
        customerId: null, // TODO
        orderList: [...parsed.values()],
    }

    console.log({ payload })

    const { status, data } = await axiosPrivate.post('/transaction', { ...payload })

    if (status !== 200) throw new Error('Transaction failed')

    return data
}

const deleteTransaction = async (id: string) => {
    const { status, data } = await axiosPrivate.delete(`/transaction/${id}`)
    if (status !== 200) throw new Error('Failed to delete')
    return data
}

export const transactionService = { create, deleteTransaction }
