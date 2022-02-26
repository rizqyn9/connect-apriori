import * as React from 'react'
import { useAuth } from '../context/user-context'
import { useLocation, Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const RequireAuth = ({ allowedRoles, children }) => {
    const { auth } = useAuth()
    const [cookies] = useCookies()
    const location = useLocation()

    return !cookies.token ? (
        <></>
    ) : allowedRoles?.includes(auth?.role) ? (
        <>{children}</>
    ) : auth?.user1 ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/auth/signin" state={{ from: location }} replace />
    )

    // return cookies.token && !auth ? (
    //     <></>
    // ) : allowedRoles?.includes(auth?.role) ? (
    //     <>{children}</>
    // ) : // auth?.user
    // auth?.user1 ? (
    //     <Navigate to="/unauthorized" state={{ from: location }} replace />
    // ) : (
    //     <Navigate to="/auth/signin" state={{ from: location }} replace />
    // )
}

export { RequireAuth }
