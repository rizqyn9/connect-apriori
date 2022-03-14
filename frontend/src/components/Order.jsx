import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useModal } from '../context/modal-context'
import { useOrder } from '../context/order-context'
import { useTransaction } from '../hooks/useTransaction'
import { Modal } from './Modal'
import OrderCard from './OrderCard'
import { Spinner } from './Spinner'

export default function Order({ className }) {
    const [showOrder, setShowOrder] = useState(true)
    const { orders, transaction } = useOrder()
    const { activatedModal } = useModal()

    const { transactionParser, transactionProcess } = useTransaction()

    const createNewTransaction = () => {}

    return (
        <div
            className={clsx(
                'w-full flex-auto flex flex-col justify-around ',
                className
            )}
        >
            <div className="flex flex-col gap-2">
                <p className={'text-md font-bold'}>Order-ID #423848234</p>
                <button
                    className="bg-primary p-2 rounded-md"
                    onClick={() =>
                        activatedModal({
                            modalComponentProp: <ModalScanRfid />,
                        })
                    }
                >
                    Gunakan promo
                </button>
                <p>status promo</p>
            </div>
            {/*Order Products*/}
            <div
                className={
                    'relative flex-1 overflow-y-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line pr-4 max-h-[50vh]'
                }
            >
                {showOrder &&
                    orders &&
                    Object.keys(orders).map((val, i) => {
                        let data = orders[val]
                        return (
                            <OrderCard
                                key={i}
                                id={val}
                                image={data.image}
                                price={data.price}
                                type={data.type}
                                menu={data.menu}
                                quantity={data.quantity}
                            />
                        )
                    })}
                {!showOrder && <Transaction showTransaction={setShowOrder} />}
            </div>

            <div className={'my-5 text-sm text-white/70 flex flex-col gap-3'}>
                <div className={'flex justify-between'}>
                    <p>Diskon</p>
                    <p>{transaction.priceTotal}</p>
                </div>{' '}
                <div className={'flex justify-between'}>
                    <p>Total Harga</p>
                    <p>{transaction.priceTotal}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Metode Pembayaran</p>
                    <p>
                        {transaction.paymentType == ''
                            ? '-'
                            : transaction.paymentType}
                    </p>
                </div>
            </div>
            {showOrder ? (
                <button
                    className={
                        'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed'
                    }
                    disabled={Object.keys(orders).length == 0}
                    onClick={() => setShowOrder(!showOrder)}
                >
                    Metode pembayaran
                </button>
            ) : (
                <button
                    className={
                        'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed'
                    }
                    disabled={
                        transaction.paymentType == '' || transactionProcess
                    }
                    onClick={() =>
                        transactionParser(
                            { orders, transaction },
                            ({ order, transaction }) =>
                                activatedModal({
                                    modalComponentProp: (
                                        <ModalPayment
                                            transaction={transaction}
                                            order={order}
                                        />
                                    ),
                                })
                        )
                    }
                >
                    Buat order
                </button>
            )}
        </div>
    )
}

function Transaction({ showTransaction }) {
    const { transaction, updatePaymentType } = useOrder()

    const handleBack = () => {
        showTransaction(true)
        updatePaymentType('')
    }

    return (
        <div className="flex flex-col gap-5 max-h-full">
            <div className="sticky top-0 bg-dark-2 z-10 w-full pb-3">
                <button
                    onClick={handleBack}
                    className="border-2 border-primary px-3 py-2 rounded-md w-full"
                >
                    back
                </button>
            </div>
            <div className="">
                <div className="grid w-full gap-5 grid-cols-2">
                    {transactionVariants.map((val, i) => {
                        return (
                            <TransactionTypeCard
                                key={i}
                                type={val.type}
                                setTransaction={updatePaymentType}
                                transactionType={transaction.paymentType}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

/**
 * Tipe Pembayaran yang disupport
 */
let transactionVariants = [{ type: 'DANA' }, { type: 'OVO' }, { type: 'GOPAY' }]

function TransactionTypeCard({ type, setTransaction, transactionType }) {
    return (
        <button
            onClick={() => {
                setTransaction(type)
            }}
            className={clsx(
                'w-full aspect-w-1 aspect-h-1 border-2 rounded-md flex justify-center items-center',
                { 'bg-primary': transactionType == type }
            )}
        >
            <div className="flex items-center justify-center">{type}</div>
        </button>
    )
}

/**
 * Component Modal untuk scan RFID
 */
function ModalScanRfid() {
    return (
        <Modal title={'Scan'}>
            <div className="flex flex-col gap-5">
                <input type={'text'} className="p-2 bg-form" />
                <button>Menunggu scan</button>
            </div>
        </Modal>
    )
}

/**
 * Component Modal untuk melanjutkan pembayaran
 */

function ModalPayment({ order, transaction }) {
    const [paymentState, setPaymentState] = useState(null)
    const { closeModal } = useModal()
    const { createTransaction, transactionProcess } = useTransaction()

    const handleCreateTransaction = () => {
        createTransaction()
    }

    const handleCancel = () => {
        closeModal()
    }

    useEffect(() => {
        console.log('Transacto', transactionProcess)
    }, [transactionProcess])

    console.table(order)
    return (
        <Modal title={'Pembayaran'} className="w-[50vw]">
            {transactionProcess && (
                <p>
                    <Spinner /> Create transaction
                </p>
            )}
            {!transactionProcess && (
                <div className="flex flex-col justify-between">
                    <div className="py-5">
                        <p>Metode pembayaran {transaction?.paymentType}</p>
                        {Array.isArray(order) &&
                            order.map((val, i) => <p key={i}>{val.menu}</p>)}
                    </div>
                    <div>{JSON.stringify(transaction)}</div>
                    {/* Button Container */}
                    <div className="p-5 flex gap-5 items-center justify-center">
                        <button
                            onClick={() => handleCancel()}
                            className="rounded-md border-2 border-primary px-4 py-2"
                        >
                            Batal
                        </button>
                        <button
                            onClick={() => handleCreateTransaction()}
                            className="rounded-md bg-primary px-4 py-2"
                        >
                            Terima pembayran
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}
