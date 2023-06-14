import { useNavigate } from 'react-router-dom'
import { useAuthUser, useSignOut } from 'react-auth-kit'
import create from 'zustand'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'

export const ROLE = z.enum(['admin', 'casheer'])
export type RoleType = z.infer<typeof ROLE>

export const useAuthStore = create<{ getToken(): string }>((set, get) => ({
  getToken() {
    return 'Hhahah'
  },
}))

type UserData = {
  name: string
  isAdmin: boolean
  email: string
  role: RoleType
}

export function useAuth() {
  const navigate = useNavigate()
  const authSignOut = useSignOut()
  const auth = useAuthUser()
  const query = useQueryClient()

  const signOut = async () => {
    authSignOut()
    navigate('/auth/signin')
    query.clear()
  }

  const authUser = () => {
    const authData = auth() as UserData | null
    if (!authData || typeof authData.isAdmin === 'undefined') {
      signOut()
    } else return authData
  }

  return { signOut, authUser } as const
}

export type UseAuthReturn = ReturnType<typeof useAuth>
