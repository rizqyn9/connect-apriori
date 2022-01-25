import clsx from 'clsx'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Icon from './Icon'

export default function Sidebar() {
    return (
        <div className="h-full rounded-md flex flex-col gap-8 items-center">
            {/*Logo*/}
            <div className={'text-primary font-extrabold text-4xl '}>CC</div>
            <hr className="border-dark-line border-1 w-full" />
            <NavItem to="/" title="Dashboard" icon={<Icon.Home />} />
            <NavItem to="/product" title="Input" icon={<Icon.History />} />
            <NavItem
                to="/product-management"
                title="Product Management"
                icon={<Icon.Setting />}
            />
            <NavItem
                to="/admin/account-management"
                title="Account Management"
                icon={<Icon.AccountManager />}
            />
        </div>
    )
}

function UserContainer() {
    return (
        <div className="w-full py-7 mb-5 flex flex-col items-center justify-center gap-2 bg-blue-100 rounded-lg">
            <div className="bg-blue-600 w-[8rem] h-[8rem] rounded-full" />
            <p>Name</p>
            <p>Name</p>
        </div>
    )
}

function NavItem({ to, title, icon }) {
    const location = useLocation()
    const { pathname } = location

    let isActive = pathname === to

    return (
        <NavLink to={to || 'mock'} className={'text-primary'}>
            {/* Logo */}
            <div
                className={clsx(
                    'p-[16px] w-max rounded-md w-[56px] h-[56px]',
                    isActive
                        ? 'bg-primary text-white nav__active'
                        : 'text-primary hover:text-white'
                )}
            >
                {icon || <Icon.Home />}
            </div>
            {/*{title || 'Mock'}*/}
        </NavLink>
    )
}
