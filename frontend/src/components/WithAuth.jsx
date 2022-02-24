import * as React from 'react'
import { useAuth } from '../context/user-context'
import { useLocation, Navigate } from 'react-router-dom'
import { useToast } from '../context/toast-context'

const RequireAuth = ({ allowedRoles, children }) => {
    const { auth } = useAuth()
    const location = useLocation()

    console.log('Token:', auth)
    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        <>{children}</>
    ) : // auth?.user
    auth?.user1 ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/auth/signin" state={{ from: location }} replace />
    )
}

export { RequireAuth }
