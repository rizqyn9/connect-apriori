import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { useIsAuthenticated } from 'react-auth-kit'

const RequireAuth = ({ allowedRoles, children }) => {
    const isAuthenticated = useIsAuthenticated()
    return isAuthenticated ? <>{children}</> : <Navigate to={'/auth/signin'} />
}

export { RequireAuth }
