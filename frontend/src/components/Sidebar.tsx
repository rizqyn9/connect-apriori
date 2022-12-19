import React from 'react'
import clsx from 'clsx'
import { useLocation, NavLink } from 'react-router-dom'
import { GridRow } from './Grid'
import Icon from './Icon'
import { useAuth } from '../hooks/useAuth'

const routes: (NavItemProps & { isAdmin?: boolean })[] = [
  { to: '/', title: 'Dashboard', icon: Icon.Home },
  { to: '/product', title: 'Input', icon: Icon.History },
  { to: '/product-management', title: 'Product Management', icon: Icon.Setting },
  { to: '/admin/account-management', title: 'Account Management', icon: Icon.AccountManager },
  { to: '/apriori', title: 'Apriori', icon: Icon.Bot },
  { to: '/config', title: 'Config', icon: Icon.Home, isAdmin: true },
]

export default function Sidebar() {
  const { authUser } = useAuth()

  const render = React.useMemo(() => {
    const isAdmin = authUser()?.isAdmin
    return routes.map((x) => (x.isAdmin && !isAdmin ? null : <NavItem {...x} key={x.to} />))
  }, [authUser])

  const title = React.useMemo(
    () => <div className="text-primary bg-dark-2 font-extrabold text-2xl w-full h-full flex items-center justify-center" children="CC" />,
    [],
  )
  return (
    <GridRow className="justify-center" title={title}>
      <div className="flex flex-col gap-5 py-8 items-center">{render}</div>
    </GridRow>
  )
}

type NavItemProps = {
  to: string
  title?: string
  icon: () => React.ReactNode
}
function NavItem({ to, title, icon }: NavItemProps) {
  const location = useLocation()
  const { pathname } = location

  let isActive = pathname === to

  return (
    <NavLink
      to={to || 'mock'}
      className={clsx('h-[3rem] w-[3rem] relative p-3 rounded-lg', {
        'text-white bg-primary shadow-active': isActive,
        'text-primary': !isActive,
      })}
    >
      {icon || <Icon.Home />}
    </NavLink>
  )
}
