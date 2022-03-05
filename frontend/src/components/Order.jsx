import clsx from 'clsx'
import React, { useContext, useEffect, useState } from 'react'
import { useOrder } from '../context/order-context'
import { useTransaction } from '../hooks/useTransaction'
import OrderCard from './OrderCard'

let OrderModels = {
    discount: 0,
    total: 0,
    totalOrder: 0,
    menuOrder: [],
    payment: null,
}

export default function Order({ className }) {
    const { orders, transaction } = useOrder()
    const { newTransaction, transactionProcess } = useTransaction()
    const [showOrder, setShowOrder] = useState(true)

    const createNewTransaction = () => {}

    return (
        <div
            className={clsx(
                'w-full flex-auto flex flex-col gap-2 justify-around ',
                className
            )}
        >
            <p className={'text-md font-bold'}>Order-ID #423848234</p>
            {/*Order Products*/}
            <div
                className={
                    'relative mt-5 flex-1 overflow-y-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line pr-4 max-h-[50vh]'
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
                        'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed'
                    }
                    disabled={Object.keys(orders).length == 0}
                    onClick={() => setShowOrder(!showOrder)}
                >
                    Metode pembayaran
                </button>
            ) : (
                <button
                    className={
                        'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed'
                    }
                    disabled={
                        transaction.paymentType == '' || transactionProcess
                    }
                    onClick={async () =>
                        newTransaction({ orders, transaction })
                    }
                >
                    Bayar sekarang
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
                    <TransactionTypeCard
                        type={'Tunai'}
                        setTransaction={updatePaymentType}
                        transactionType={transaction.paymentType}
                    />
                    <TransactionTypeCard
                        type={'OVO'}
                        setTransaction={updatePaymentType}
                        transactionType={transaction.paymentType}
                    />
                    <TransactionTypeCard
                        type={'DANA'}
                        setTransaction={updatePaymentType}
                        transactionType={transaction.paymentType}
                    />
                    <TransactionTypeCard
                        type={'KTP'}
                        setTransaction={updatePaymentType}
                        transactionType={transaction.paymentType}
                    />
                </div>
            </div>
        </div>
    )
}

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
