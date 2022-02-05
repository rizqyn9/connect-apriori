import React, { useContext, useEffect } from 'react'
import { useOrder } from '../context/order-context'
import OrderCard from './OrderCard'

let OrderModels = {
    discount: 0,
    total: 0,
    totalOrder: 0,
    menuOrder: [],
    payment: null,
}

export default function Order() {
    const { orders, transaction } = useOrder()
    return (
        <div
            className={
                'w-full flex-auto max-h-[85%] flex flex-col gap-2 justify-around '
            }
        >
            <p className={'text-md font-bold'}>Order #423848234</p>
            {/*Order Products*/}
            <div
                className={
                    'relative mt-5 flex-1 overflow-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line'
                }
            >
                {orders &&
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
            >
                Set payment method
            </button>
        </div>
    )
}
