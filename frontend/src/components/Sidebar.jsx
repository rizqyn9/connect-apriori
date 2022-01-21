import clsx from 'clsx'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className="w-[15rem] p-6 flex flex-col gap-5">
            <NavItem to="/" title="Dashboard" />
            <NavItem />
            <NavItem />
            <NavItem />
        </div>
    )
}

function NavItem({ to, title }) {
    const location = useLocation()
    const { pathname } = location

    let isActive = pathname == to

    return (
        <NavLink
            to={to || 'mock'}
            className={clsx(
                'w-full font-semibold block bg-white p-2 px-3 text-indigo-900 rounded-md hover:bg-indigo-100 transition duration-200',
                isActive && 'bg-indigo-200 text-indigo-900 '
            )}
        >
            {/* Logo */}
            <i className="w-3 h-6 bg-indigo-800" />
            {title || 'Mock'}
        </NavLink>
    )
}
