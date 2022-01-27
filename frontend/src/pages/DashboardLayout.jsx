import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Routes, Route, Outlet } from 'react-router-dom'

export default function DashboardLayout({ children }) {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    return (
        <div className="w-screen h-screen flex bg-dark-1">
            {/* Sidebar */}
            <div className="min-w-[5rem] p-5 bg-dark-2">
                <Sidebar />
            </div>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    )
}
