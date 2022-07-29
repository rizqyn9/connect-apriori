import React from 'react'
import { Dialog } from '@headlessui/react'
import { Button } from '../Button'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'
import { TablePaymentOrder } from '../Table/TablePaymentOrder'
import { useToastStore } from '../Toast'
import { useOrderStore } from '../../hooks/useOrder'
import { useTransactionStore } from '../../hooks/useTransaction'
import { useOnce } from '../../hooks/useOnce'

type DialogPaymentProps = DialogContainerProps & {}

export function DialogPayment(props: DialogPaymentProps) {
    const [loading, setLoading] = React.useState(false)
    const { addToast } = useToastStore()
    const {
        props: transaction,
        clearTransaction,
        doPaid,
    } = useTransactionStore()
    const { orders, clearOrders, state, updateState } = useOrderStore()

    const handleOnPaid = React.useCallback(async () => {
        try {
            setLoading(true)
            await doPaid()
            addToast({ msg: 'Transaction success' })
        } catch (error) {
            console.log(error)

            addToast({ msg: 'Transaction failed', type: 'error' })
        } finally {
            setLoading(false)
            props.setIsOpen(false)
        }
        // await new Promise((res) => setTimeout(res, 3000))
        // clearOrders()
        // clearTransaction()
        // updateState('choose product')
    }, [setLoading])

    const handlePaidSuccess = () => {}

    useOnce(() => {
        updateState('choose product')
    }, [])

    const handleCancel = React.useCallback(() => props.setIsOpen(false), [])

    return (
        <DialogContainer {...props}>
            <Dialog.Panel className="bg-dark-2 border border-white p-5 text-white rounded-lg w-[50vw] h-[90vh] flex flex-col">
                <H1>Payment</H1>
                <div className="flex flex-col h-[95%] justify-between">
                    {loading ? (
                        <div className="grid w-full h-full place-content-center">
                            Create order
                        </div>
                    ) : (
                        <>
                            <div className="py-4 h-[70%]">
                                <p className="text-lg font-bold mb-3">
                                    Menu order
                                </p>
                                <div className="rounded-md overflow-scroll h-full">
                                    <TablePaymentOrder
                                        orders={Object.values(orders)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-md font-bold">
                                    Transaction details
                                </p>
                                <p className="text-md font-bold">Total</p>
                                <p className="self-end text-lg">
                                    {transaction.total}
                                </p>
                                <div className="flex justify-end gap-5">
                                    <Button
                                        className="w-1/4"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="w-1/4"
                                        onClick={handleOnPaid}
                                    >
                                        Paid
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}
