import * as React from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const RequireAuth = ({ allowedRoles, children }) => {
    const [cookies] = useCookies(['token'])

    return cookies.token ? <>{children}</> : <Navigate to={'/auth/signin'} />
}

export { RequireAuth }
