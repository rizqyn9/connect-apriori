import React from 'react'
import OrderCard from './OrderCard'

export default function Order() {
    return (
        <div
            className={'w-full h-[80%] flex-grow flex flex-col justify-around'}
        >
            <p className={'text-md font-bold'}>Order #423848234</p>
            {/*Order Products*/}
            <div
                className={
                    'mt-5 max-h-[60%] overflow-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line'
                }
            >
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
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
