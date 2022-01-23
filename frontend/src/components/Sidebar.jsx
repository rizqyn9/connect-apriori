import clsx from 'clsx'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="h-full rounded-md flex flex-col gap-3">
            <UserContainer />
            <NavItem to="/" title="Dashboard" />
            <NavItem to="/product" title="Input" />
            <NavItem
                to="/admin/account-management"
                title="Account Management"
            />
            <NavItem />
        </div>
    )
}

function UserContainer() {
    return (
        <div className="w-full py-7 mb-5 flex flex-col items-center justify-center gap-2 bg-blue-100 rounded-lg">
            <div className="bg-blue-600 w-[8rem] h-[8rem] rounded-full"></div>
            <p>Name</p>
            <p>Name</p>
        </div>
    )
}

function NavItem({ to, title }) {
    const location = useLocation()
    const { pathname } = location

    let isActive = pathname === to

    return (
        <NavLink
            to={to || 'mock'}
            className={clsx(
                'w-full font-semibold block  p-2 px-3 rounded-md transition-all duration-200',
                {
                    'bg-blue-600 text-white shadow-inner shadow-blue-900 border-2 border-white':
                        isActive,
                },
                {
                    'bg-blue-50 text-gray-900 hover:bg-blue-400 hover:text-white':
                        !isActive,
                }
            )}
        >
            {/* Logo */}
            <i className="w-3 h-6 bg-indigo-800" />
            {title || 'Mock'}
        </NavLink>
    )
}
