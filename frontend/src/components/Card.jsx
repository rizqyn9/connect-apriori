import React from 'react'

export default function Card() {
    return (
        <div className="w-[12rem] h-[18rem] p-3 rounded-2xl drop-shadow-md flex flex-col items-center justify-around bg-dark-2">
            <div className="w-[8rem] h-[8rem] bg-primary rounded-2xl mb-4 overflow-hidden">
                <img
                    src="/src/static/images/dummy.jpg"
                    className="mt-[-4rem]"
                    alt="dummy"
                />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
                <h2 className="text-md">Americano</h2>
                <p className="text-xs text-white/80">Rp. 12.000</p>
            </div>
            <button className="text-xs bg-primary p-2 w-full text-center rounded-lg hover:opacity-80">
                Add to billing
            </button>
        </div>
    )
}
