import { Dialog } from '@headlessui/react'
import { useOrderStore } from '../../hooks/useOrder'
import { useTransactionStore } from '../../hooks/useTransaction'
import { Button } from '../Button'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'
import clsx from 'clsx'

type DialogPaymentProps = DialogContainerProps & {}

export function DialogPayment(props: DialogPaymentProps) {
    const { props: transaction } = useTransactionStore()
    const { orders } = useOrderStore()
    return (
        <DialogContainer {...props}>
            <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] h-[80vh] flex flex-col">
                <H1>Payment</H1>
                <div className="flex-1 flex flex-col">
                    {/* Order */}
                    <div className="flex-1 py-4">
                        <p className="text-lg font-bold mb-3">Menu order</p>
                        <div className="border border-white rounded-md overflow-hidden">
                            <div className="flex w-full justify-between p-2 font-bold bg-primary border border-white">
                                <p className="text-left">Menu</p>
                                <p className="text-center">Price</p>
                                <p className="text-right">Quantity</p>
                            </div>
                            {Object.entries(orders).map(([key, order], i) => (
                                <OrderReceipt
                                    key={i}
                                    className="p-2 odd:bg-primary/20"
                                    {...order}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <p className="text-md font-bold">Transaction details</p>
                        <p className="text-md font-bold">Total</p>
                        <p className="self-end text-lg">{transaction.total}</p>
                        <div className="flex justify-end gap-5">
                            <Button className="w-1/4">Cancel</Button>
                            <Button className="w-1/4">Next</Button>
                        </div>
                    </div>
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}

type OrderReceiptProps = {
    menu: string
    quantity: number
    price: number
    className?: string
}

function OrderReceipt(props: OrderReceiptProps) {
    return (
        <div className={clsx('flex w-full justify-between', props.className)}>
            <p className="text-left">{props.menu}</p>
            <p className="text-left">{props.price}</p>
            <p className="text-right">{props.quantity}</p>
        </div>
    )
}
