import React, { useState } from 'react'
import { useOrder } from '../hooks/useOrder'
import Icon from './Icon'

/**
 * Untuk menampilkan barang yang diorder
 */
function OrderCard({ orderID, id, menu, image, price, type, quantity }) {
    const { removeOrder, setNotes, updateQuantity } = useOrder()

    return (
        <div className="bg-dark-1 p-2 rounded-md flex flex-col gap-2">
            {/*Image & Menu Details*/}
            <div className={'flex gap-3'}>
                {/*Product Image*/}
                <div className="w-[6rem] h-[6rem] rounded-lg border-2 border-primary/70 overflow-hidden">
                    <img src={image} className="" alt={''} />
                </div>
                <div className="flex flex-col justify-between">
                    {/*Menu & Type*/}
                    <div className={'flex gap-4 align-center'}>
                        <div className="w-5 h-5 ">
                            {type === 'hot' ? <Icon.Hot /> : <Icon.Ice />}
                        </div>
                        <h2 className="font-bold text-md">{menu}</h2>
                    </div>
                    <h2 className="text-sm">Rp. {price * quantity}</h2>
                    <IncrDcr
                        quantity={quantity}
                        decrement={() => updateQuantity(orderID, false)}
                        incremnt={() => updateQuantity(orderID, true)}
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <input
                    className={
                        'flex-auto h-8 bg-dark-2 p-2 rounded-md border-2 border-dark-line text-white text-sm'
                    }
                    placeholder={'Notes'}
                    onChange={(e) => setNotes(orderID, e.target.value)}
                />
                <button
                    className="h-8 w-8 p-1 border-2 border-primary rounded-md text-primary hover:text-primary/50"
                    onClick={() => removeOrder(orderID)}
                >
                    <Icon.Delete />
                </button>
            </div>
        </div>
    )
}

function IncrDcr({ quantity, incremnt, decrement }) {
    return (
        <div className={'h-6 w-max flex overflow-hidden rounded-md'}>
            <button
                onClick={() => decrement()}
                className={'bg-primary flex-center p-2 h-full'}
            >
                -
            </button>
            <p
                className={
                    'bg-dark-2 text-white flex-center p-2 h-full text-xs'
                }
            >
                {quantity}
            </p>
            <button
                onClick={() => incremnt()}
                className={'bg-primary flex-center p-2 h-full'}
            >
                +
            </button>
        </div>
    )
}

const OrderCardMemo = React.memo(OrderCard)
export { OrderCardMemo, OrderCard }
