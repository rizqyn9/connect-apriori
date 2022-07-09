import React from 'react'

export default function Header() {
    return (
        <div
            className="w-full bg-indigo-400 px-6 py-3 py-auto flex-none "
            style={{ boxShadow: '1px 1px 1rem red' }}
        >
            <h2 className="text-xs">
                <span className="text-lg font-bold">CC</span> Connect Coffee
            </h2>
        </div>
    )
}
