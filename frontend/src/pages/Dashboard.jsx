import React, { useState } from 'react'
import Catalog from '../components/Catalog'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    return (
        <div className="w-screen h-screen flex flex-col">
            {/* <Sidebar /> */}
            <Header />

            {/* Content */}
            <div className="w-full flex flex-grow">
                {/* Sidebar */}
                <Sidebar />
                <div className="bg-gray-100 flex-grow p-7">
                    <Catalog />
                </div>
            </div>
        </div>
    )
}
