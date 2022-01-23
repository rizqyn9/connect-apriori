import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { Routes, Route, Outlet } from 'react-router-dom'

export default function DashboardLayout({ children }) {
    const [sideBarOpen, setSideBarOpen] = useState(false)

    return (
        <div className="w-screen h-screen flex bg-gradient-to-tl from-blue-400 via-purple-900 to-blue-800">
            {/* Sidebar */}
            <div className="min-w-[15rem] p-5 bg-blue-300 border-r-2 border-blue-300 shadow-xl shadow-red-900 bg-gradient-to-b from-blue-300 to-violet-300">
                <Sidebar />
            </div>
            <div className="flex-grow p-5">
                <Outlet />
            </div>
        </div>
    )
}
