import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { OrderProvider } from '../context/order-context'

export default function DashboardLayout() {
    return (
        <OrderProvider>
            <div className="w-screen h-screen flex bg-dark-1">
                {/* Sidebar */}
                <div className="w-[7rem] bg-dark-2 flex-shrink">
                    <Sidebar />
                </div>
                <div className="flex flex-1 text-white">{/* <Outlet /> */}</div>
            </div>
        </OrderProvider>
    )
}
