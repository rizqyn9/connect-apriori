import { useMemo } from 'react'
import { useIsAuthenticated } from 'react-auth-kit'
import { Navigate } from 'react-router-dom'

type AuthProps = {
  children: React.ReactNode
}

function Auth({ children }: AuthProps) {
  const isAuthenticated = useIsAuthenticated()

  const content = useMemo(() => {
    if (isAuthenticated()) return <Navigate to="/" />
    return (
      <div className="bg-dark-2 flex h-screen overflow-hidden justify-center text-white">
        <div className="py-7 px-8 flex flex-col gap-2 bg-dark-1 w-3/5 min-w-max max-w-sm min-h-[10rem] self-center rounded-xl">{children}</div>
      </div>
    )
  }, [isAuthenticated])

  return content
}

export { Auth as AuthLayout }
