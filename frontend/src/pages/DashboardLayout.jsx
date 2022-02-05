import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { OrderProvider } from '../context/order-context'

export default function DashboardLayout() {
    return (
        <OrderProvider>
            <div className="w-screen h-screen flex bg-dark-1">
                {/* Sidebar */}
                <div className="min-w-[5rem] p-5 bg-dark-2">
                    <Sidebar />
                </div>
                <div className="flex-grow">
                    <Outlet />
                </div>
            </div>
        </OrderProvider>
    )
}
