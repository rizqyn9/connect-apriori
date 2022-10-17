import { useIsAuthenticated } from 'react-auth-kit'
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ allowedRoles, children }) => {
    const isAuthenticated = useIsAuthenticated()
    return isAuthenticated() ? <>{children}</> : <Navigate to={'/auth/signin'} />
}

export { RequireAuth }
