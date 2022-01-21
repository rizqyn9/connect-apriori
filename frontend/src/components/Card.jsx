import React from 'react'

export default function Card() {
    return (
        <div className="bg-white w-[15rem] h-[15rem] p-3 rounded-md drop-shadow-md flex flex-col gap-2 items-center justify-center">
            <div className="bg-indigo-200 flex-grow w-full rounded-md"></div>
            <h2 className="text-lg font-semibold text-indigo-800 text-left w-full">
                Menu
            </h2>
        </div>
    )
}
