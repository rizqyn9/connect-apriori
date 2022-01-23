import React from 'react'
import Card from './Card'

export default function Catalog() {
    return (
        <div className="w-full bg-blue-200 p-4 rounded-lg shadow-lg">
            <h1 className="text-2xl text-blue-800 font-bold mb-5 bg-blue-50 border-l-4 border-blue-900 p-3 pl-5 rounded-md">
                Daftar Menu
            </h1>
            <div className="flex flex-wrap gap-5">
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    )
}
