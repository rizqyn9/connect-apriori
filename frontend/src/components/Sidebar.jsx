import clsx from 'clsx'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { GridRow } from './Grid'
import Icon from './Icon'

export default function Sidebar() {
    return (
        <GridRow
            title={
                <div
                    className={
                        'text-primary font-extrabold text-4xl w-full h-full flex items-center justify-center'
                    }
                >
                    CC
                </div>
            }
            className="place-content-center"
        >
            <div className="flex flex-col gap-5 py-5">
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
        </GridRow>
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
        </NavLink>
    )
}
