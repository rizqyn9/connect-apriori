import React, { useState } from 'react'

export default function OrderCard({ id, image, price, type }) {
    const [total, setTotal] = useState(1)

    const handle = (isIncrement) => {
        if (isIncrement) setTotal(total + 1)
        else {
            if (total === 1) return
            setTotal(total - 1)
        }
    }

    console.log('render :', id)

    return (
        <div className="bg-dark-1 p-2 rounded-md flex gap-5">
            {/*Product Image*/}
            <div className="w-20 h-20 overflow-hidden">
                <img src={image} className="mt-[-2.5rem]" />
            </div>
            <div>
                <h2 className="font-bold text-sm">Product Name</h2>
                <h2 className="text-xs">Rp. {parseInt(price) * total}</h2>
                <h2>{type}</h2>
            </div>
            {/*Increment Decrement*/}
            <div className={'h-6 flex overflow-hidden rounded-md'}>
                <button
                    onClick={() => handle(false)}
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
                    {total}
                </p>
                <button
                    onClick={() => handle(true)}
                    className={
                        'bg-primary flex items-center justify-center p-2 h-full'
                    }
                >
                    +
                </button>
            </div>
            {/*<button className="w-3 h-3">*/}
            {/*    <Icon.Delete />*/}
            {/*</button>*/}
        </div>
    )
}
