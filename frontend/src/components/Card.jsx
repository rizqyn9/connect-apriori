import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { useOrder } from '../context/order-context'
import Icon from './Icon'
import { useOnClickOutside } from '../hooks/useClickOutside'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Card({
    menu,
    image,
    price,
    id,
    activeCard,
    setActiveCard,
}) {
    const navigate = useNavigate()
    const [type, setType] = useState('hot')
    const ref = useRef()
    const { addOrder } = useOrder()
    useOnClickOutside(ref, () => {
        setActiveCard('')
    })

    const handleType = (typeOrder) => {
        if (typeOrder === type) return
        setType(type)
    }

    // console.log(`render : ${id}`)

    return (
        <div
            className={clsx(
                'w-[12rem] h-[23rem] p-2 rounded-2xl drop-shadow-md flex flex-col gap-4 items-center justify-around bg-dark-2 relative',
                { 'outline border-2': activeCard }
            )}
            data-id={id}
            data-active={activeCard}
            onClick={() => setActiveCard(id)}
            ref={ref}
        >
            {/* Edit Icon */}
            <button
                onClick={() => navigate(`product/${id}`)}
                className="absolute top-5 hover:bg-primary cursor-pointer left-5 bg-gray-50 w-6 h-6 rounded-full z-10"
            ></button>

            <div className="w-full pt-[100%] relative bg-primary rounded-xl overflow-hidden">
                <img
                    src={image}
                    className="mt-[-4rem] absolute top-0 left-0"
                    alt="dummy"
                />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="text-lg">{menu}</h2>
                <p className="text-sm text-white/80">Rp. {price}</p>
            </div>
            {/*Ice / Hot*/}
            <div className={'flex gap-5'}>
                <div
                    className={clsx(
                        'w-8 h-8 p-1 grid place-content-center rounded-md cursor-pointer',
                        type === 'hot'
                            ? 'bg-primary/50 text-white'
                            : 'bg-dark-1 text-[#f7a474]'
                    )}
                    onClick={() => setType('hot')}
                >
                    <Icon.Hot />
                </div>
                <div
                    className={clsx(
                        'w-8 h-8 p-1 grid place-content-center rounded-md cursor-pointer',
                        type === 'ice'
                            ? 'bg-primary/50 text-red-900'
                            : 'bg-dark-1 text-[#89f1f5]'
                    )}
                    style={{ color: 'cyan' }}
                    onClick={() => setType('ice')}
                >
                    <Icon.Ice />
                </div>
            </div>
            <button
                className="text-xs bg-primary p-2 w-full text-center rounded-lg hover:opacity-80"
                onClick={() => {
                    addOrder({ type, menu, id, price, image })
                }}
            >
                Add to billing
            </button>
        </div>
    )
}
