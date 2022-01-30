import React, { useState } from 'react'
import clsx from 'clsx'
import { useOrder } from '../utils/cart'

export default function Card({ menu, image, price, id }) {
    const { test } = useOrder()

    const [type, setType] = useState('hot')
    const handleType = (typeOrder) => {
        if (typeOrder === type) return
        setType(type)
    }

    console.log(`render : ${id}`)

    return (
        <div
            className="w-[10rem] h-[18rem] p-2 py-1 rounded-2xl drop-shadow-md flex flex-col items-center justify-around bg-dark-2"
            data-id={id}
        >
            <div className="w-[8rem] h-[8rem] bg-primary rounded-2xl mb-2 overflow-hidden">
                <img src={image} className="mt-[-4rem]" alt="dummy" />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="text-md">{menu}</h2>
                <p className="text-xs text-white/80">Rp. {price}</p>
            </div>
            {/*Ice / Hot*/}
            <div className={'flex gap-5'}>
                <div
                    className={clsx(
                        'w-5 h-5 p-2 rounded-md',
                        type === 'hot' ? 'bg-primary' : 'bg-dark-1'
                    )}
                    onClick={() => setType('hot')}
                />
                <div
                    className={clsx(
                        'w-5 h-5 p-2 rounded-md',
                        type === 'ice' ? 'bg-primary' : 'bg-dark-1'
                    )}
                    onClick={() => setType('ice')}
                />
            </div>
            <button
                className="text-xs bg-primary p-2 w-full text-center rounded-lg hover:opacity-80"
                onClick={test}
            >
                Add to billing
            </button>
        </div>
    )
}
