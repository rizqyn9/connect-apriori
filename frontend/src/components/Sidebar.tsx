import React from 'react'
import clsx from 'clsx'
import { useLocation, NavLink } from 'react-router-dom'
import { GridRow } from './Grid'
import Icon from './Icon'

export default function Sidebar() {
    return (
        <GridRow
            className={'justify-center'}
            title={
                <div
                    className="text-primary font-extrabold text-2xl w-full h-full flex items-center justify-center"
                    children="CC"
                />
            }
        >
            <div className="flex flex-col gap-5 py-8 items-center">
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
                {/* <NavItem
                    to="/logout"
                    title="Account Management"
                    icon={<>LogOut</>}
                /> */}
            </div>
        </GridRow>
    )
}

type NavItemProps = {
    to: string
    title?: string
    icon: React.ReactNode
}
function NavItem({ to, title, icon }: NavItemProps) {
    const location = useLocation()
    const { pathname } = location

    let isActive = pathname === to

    return (
        <NavLink
            to={to || 'mock'}
            className={clsx('h-[3rem] w-[3rem] relative p-3 rounded-lg', {
                'text-white bg-primary ': isActive,
                'text-primary': !isActive,
            })}
        >
            {icon || <Icon.Home />}
        </NavLink>
    )
}
