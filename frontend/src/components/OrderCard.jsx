import React, { useState } from 'react'
import { useOrder } from '../context/order-context'
import Icon from './Icon'

export default function OrderCard({ id, menu, image, price, type, quantity }) {
    const { updateOrder, removeOrder } = useOrder()
    console.log('render :', id)

    const handleQuantity = (isIncrement) => {
        if (isIncrement) {
            updateOrder(id, {
                quantity: quantity + 1,
            })
        } else {
            updateOrder(id, {
                quantity: quantity - 1,
            })
        }
    }

    return (
        <div className="bg-dark-1 p-2 rounded-md flex gap-5">
            {/*Product Image*/}
            <div className="w-20 h-20 rounded-lg border-2 border-primary/70 overflow-hidden">
                <img src={image} className="mt-[-2.5rem]" alt={''} />
            </div>
            <div className="flex flex-col gap-2">
                <h2 className="font-bold text-md">{menu}</h2>
                <h2 className="text-sm">Rp. {parseInt(price) * quantity}</h2>
                <div className="w-5 h-5 ">
                    {type === 'hot' ? <Icon.Hot /> : <Icon.Ice />}
                </div>
            </div>

            {/*Increment Decrement*/}
            <div className={'h-6 flex overflow-hidden rounded-md'}>
                <button
                    onClick={() => handleQuantity(false)}
                    className={
                        'bg-primary flex items-center justify-center p-2 h-full'
                    }
                >
                    -
                </button>
                <p
                    className={
                        'bg-dark-2 text-white flex items-center justify-center p-2 h-full text-xs'
                    }
                >
                    {quantity}
                </p>
                <button
                    onClick={() => handleQuantity(true)}
                    className={
                        'bg-primary flex items-center justify-center p-2 h-full'
                    }
                >
                    +
                </button>
            </div>
            <button className="w-3 h-3" onClick={() => removeOrder(id)}>
                <Icon.Delete />
            </button>
        </div>
    )
}
