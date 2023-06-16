import React from 'react'
import clsx from 'clsx'
import { useLocation, NavLink } from 'react-router-dom'
import { GridRow } from './Grid'
import Icon from './Icon'
import { useUser } from '@/pages/DashboardLayout'

const routes: (NavItemProps & { isAdmin?: boolean })[] = [
  { to: '/', title: 'Dashboard', icon: Icon.Home, exact: true },
  { to: '/product', title: 'Input', icon: Icon.History, isAdmin: true },
  { to: '/analytics', title: 'Product Management', icon: Icon.Setting },
  { to: '/admin/account-management', title: 'Account Management', icon: Icon.AccountManager },
  { to: '/apriori', title: 'Apriori', icon: Icon.Bot, isAdmin: true },
]

export default function Sidebar() {
  const { user } = useUser()

  const render = React.useMemo(() => {
    const isAdmin = user?.role === 'admin'
    return routes.map((x) => (x.isAdmin && !isAdmin ? null : <NavItem {...x} key={x.to} />))
  }, [user])

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
  exact?: boolean
  icon: () => React.ReactNode
}

function NavItem({ to, title, icon, exact }: NavItemProps) {
  const location = useLocation()
  const { pathname } = location

  let isActive = exact ? pathname === to : pathname.includes(to)

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
