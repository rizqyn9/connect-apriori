import React from 'react'
import a from '/src/static/images/dummy.jpg'

export default function Card({ menu, image, id }) {
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
                <p className="text-xs text-white/80">Rp. 12.000</p>
            </div>
            <button className="text-xs bg-primary p-2 w-full text-center rounded-lg hover:opacity-80">
                Add to billing
            </button>
        </div>
    )
}
