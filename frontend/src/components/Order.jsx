import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { atom, useAtom } from 'jotai'

let OrderModels = {
    discount: 0,
    total: 0,
    totalOrder: 0,
    menuOrder: [],
    payment: null,
}

export default function Order() {
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
                {/*{orders.map((val, i) => {*/}
                {/*    return <OrderCard key={i} />*/}
                {/*})}*/}
            </div>
            <div className={'mt-5 text-sm text-white/70'}>
                <div>Discount</div>
                <div>Sub Total</div>
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
