import { RoleType, useAuth } from '@/hooks'
import { useIsAuthenticated } from 'react-auth-kit'
import { Navigate } from 'react-router-dom'

type RequireAuthProps = {
  children: React.ReactNode
  allowedRoles: RoleType[]
}

const RequireAuth = ({ allowedRoles, children }: RequireAuthProps) => {
  const isAuthenticated = useIsAuthenticated()
  const { authUser } = useAuth()
  const user = authUser()

  if (!isAuthenticated() || !user) return <Navigate to="/auth/signin" />

  const isAllowed = allowedRoles.includes(user.role)

  return isAllowed ? <>{children}</> : <Navigate to="/" />
}

export { RequireAuth }
