import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { atom, useAtom } from 'jotai'
import { useOrder } from '../utils/cart'

let OrderModels = {
    discount: 0,
    total: 0,
    totalOrder: 0,
    menuOrder: [],
    payment: null,
}

export default function Order() {
    const { orders, priceTotal } = useOrder()

    useEffect(() => {
        for (const order in orders) {
            // console.log(`${order} :`, orders[order])
        }
    }, [orders])

    return (
        <div
            className={'w-full h-[80%] flex-grow flex flex-col justify-around'}
        >
            <p className={'text-md font-bold'}>Order #423848234</p>

            {/*Order Products*/}
            <div
                className={
                    'mt-5 h-[60%] overflow-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line'
                }
            >
                {Object.keys(orders).map((val, i) => {
                    let data = orders[val]
                    return (
                        <OrderCard
                            key={i}
                            id={val}
                            image={data.image}
                            price={data.price}
                            type={data.type}
                        />
                    )
                })}
            </div>

            <div className={'mt-5 text-sm text-white/70'}>
                <div>Discount</div>
                <div>
                    <p>Sub Total</p>
                    <p>{priceTotal}</p>
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
