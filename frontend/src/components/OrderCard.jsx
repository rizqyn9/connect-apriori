import React, { useEffect, useState } from 'react'
import { useOrder } from '../context/order-context'
import Icon from './Icon'

export default function OrderCard({ id, menu, image, price, type, quantity }) {
    const { updateOrder, removeOrder } = useOrder()
    const [order, setOrder] = useState({
        id,
        price,
        quantity,
        totalPrice: price * quantity,
        notes: '',
    })

    const handleOnChange = (data) => {
        let total = data.quantity ? { totalPrice: price * data.quantity } : {}
        setOrder({ ...order, ...data, ...total })
    }

    console.log('render :', id)

    useEffect(() => {
        console.log(order)
    }, [order])

    return (
        <div className="bg-dark-1 p-2 rounded-md flex flex-col gap-2">
            {/*Image & Menu Details*/}
            <div className={'flex gap-3'}>
                {/*Product Image*/}
                <div className="w-[6rem] h-[6rem] rounded-lg border-2 border-primary/70 overflow-hidden">
                    <img src={image} className="mt-[-2.5rem]" alt={''} />
                </div>
                <div className="flex flex-col gap-2">
                    {/*Menu & Type*/}
                    <div className={'flex gap-2 align-center'}>
                        <div className="w-5 h-5 ">
                            {type === 'hot' ? <Icon.Hot /> : <Icon.Ice />}
                        </div>
                        <h2 className="font-bold text-md">{menu}</h2>
                    </div>
                    <h2 className="text-sm">Rp. {order.totalPrice}</h2>
                    <IncrDcr order={order} handleOnChange={handleOnChange} />
                </div>
            </div>
            <div className="flex gap-3">
                <input
                    className={
                        'flex-auto h-8 bg-dark-2 p-2 rounded-md border-2 border-dark-line text-primary text-sm'
                    }
                    placeholder={'Notes'}
                />
                <button
                    className="h-8 w-8 p-1 border-2 border-primary rounded-md text-primary hover:text-primary/50"
                    onClick={() => removeOrder(id)}
                >
                    <Icon.Delete />
                </button>
            </div>
        </div>
    )
}

function IncrDcr({ order, handleOnChange }) {
    const handleQuantity = (isIncrement) => {
        if (isIncrement) {
            handleOnChange({ quantity: (order.quantity += 1) })
        } else {
            if (order.quantity === 0) return
            else handleOnChange({ quantity: (order.quantity -= 1) })
        }
    }
    return (
        <div className={'h-6 w-max flex overflow-hidden rounded-md'}>
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
                {order.quantity}
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
    )
}
