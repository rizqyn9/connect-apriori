import { useNavigate } from 'react-router-dom'
import { useAuthUser, useSignIn, useSignOut } from 'react-auth-kit'
import create from 'zustand'

export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
})

export const useAuthStore = create<{ getToken(): string }>((set, get) => ({
    getToken() {
        return 'Hhahah'
    },
}))

type UserData = {
    name: string
    isAdmin: boolean
    email: string
}

export function useAuth() {
    const navigate = useNavigate()
    const authSignIn = useSignIn()
    const authSignOut = useSignOut()
    const auth = useAuthUser()

    const signOut = async () => {
        authSignOut()
        navigate('/auth/signin')
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
