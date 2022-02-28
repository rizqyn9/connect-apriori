import clsx from 'clsx'
import React, { useContext, useEffect, useState } from 'react'
import { useOrder } from '../context/order-context'
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
    const [showOrder, setShowOrder] = useState(false)

    return (
        <div
            className={clsx(
                'w-full flex-auto flex flex-col gap-2 justify-around ',
                className
            )}
        >
            <p className={'text-md font-bold'}>Order #423848234</p>
            {/*Order Products*/}
            <div
                className={
                    'relative mt-5 flex-1 overflow-y-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line pr-4 max-h-[60vh]'
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
                    <p>Discount</p>
                    <p>{transaction.priceTotal}</p>
                </div>{' '}
                <div className={'flex justify-between'}>
                    <p>Sub Total</p>
                    <p>{transaction.priceTotal}</p>
                </div>
            </div>
            <button
                className={
                    'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80'
                }
                onClick={() => setShowOrder(!showOrder)}
            >
                Set payment method
            </button>
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
        <div>
            <button
                onClick={handleBack}
                className="bg-primary px-3 py-2 rounded-md"
            >
                back
            </button>
            <h2>Transaction</h2>
            {transaction.paymentType && <div>{transaction.paymentType}</div>}
            <div className="grid gap-5 grid-cols-2">
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
