import React from 'react'
import { useOrder } from '../../hooks/useOrder'
import { useTransaction } from '../../hooks/useTransaction'
import { Modal, ModalContainer, ModalFooter } from '../Modal/Base'

function ModalPayment({ close }) {
    const { orders } = useOrder()
    const {
        transaction,
        createTransaction,
        transactionState,
        TransactionStateType,
    } = useTransaction()

    const Content = React.useMemo(() => {
        switch (transactionState) {
            case TransactionStateType.ORDER:
                return (
                    <CreateOrder
                        transaction={transaction}
                        orders={orders}
                        close={close}
                        createTransaction={createTransaction}
                    />
                )
            case TransactionStateType.SUCCESS:
                return <OrderStatus status="Transaksi sukses" />
            default:
                return <div>Load</div>
        }
    }, [transactionState])

    return (
        <ModalContainer>
            <Modal title={'Pembayaran'} className="min-w-[40vw]" close={close}>
                {Content}
            </Modal>
        </ModalContainer>
    )
}

function CreateOrder({ transaction, orders, close, createTransaction }) {
    return (
        <>
            <div className="flex flex-col justify-between w-full">
                <div className="py-5">
                    <p className="text-lg font-bold">
                        Metode pembayaran {transaction.paymentMehod}
                    </p>
                    <table className="w-full mt-4">
                        <thead>
                            <tr className="bg-dark-2">
                                <td className="">Menu</td>
                                <td className="text-center">Type</td>
                                <td className="text-center">Jumlah</td>
                                <td className="text-right">Harga</td>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(orders).map(([key, val]) => {
                                return (
                                    <OrderMapPayment
                                        key={key}
                                        namaMenu={val.menu}
                                        hargaMenu={val.price}
                                        quantity={val.quantity}
                                        type={val.type}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div
                className={
                    'text-sm text-white/70 flex flex-col gap-3 w-1/2 m-auto'
                }
            >
                <div className={'flex justify-between'}>
                    <p>Diskon</p>
                    <p>{transaction.discount}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Total Harga</p>
                    <p>{transaction.price}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Metode Pembayaran</p>
                    <p>{transaction.paymentMehod ?? '-'}</p>
                </div>
            </div>
            <ModalFooter>
                <div className="flex gap-5 items-center justify-center">
                    <button
                        onClick={() => close()}
                        className="rounded-md border-2 border-primary px-4 py-2"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => createTransaction()}
                        className="rounded-md bg-primary px-4 py-2"
                    >
                        Terima pembayaran
                    </button>
                </div>
            </ModalFooter>{' '}
        </>
    )
}

function OrderStatus({ status }) {
    return <div>{status}</div>
}

function OrderMapPayment({ namaMenu, hargaMenu, quantity, type }) {
    return (
        <tr className="even:bg-primary/10">
            <td className="">{namaMenu}</td>
            <td className="text-center">{type}</td>
            <td className="text-center">{quantity}</td>
            <td className="text-right">{hargaMenu}</td>
        </tr>
    )
}

function PaymentStatus({ isSucces, closeModal, setTransactionStatus }) {
    return (
        <div className="w-full flex flex-col gap-10 items-center justify-center">
            <p className="font-bold text-2xl">{isSucces && 'Success'}</p>
            <button
                onClick={() => {
                    setTransactionStatus(null)
                    closeModal()
                }}
                className="px-3 py-2 rounded-md"
                style={{ boxShadow: '0 0 1px white' }}
            >
                Kembali ke dashboard
            </button>
        </div>
    )
}

export { ModalPayment }
