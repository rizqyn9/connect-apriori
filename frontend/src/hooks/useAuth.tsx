import { useNavigate } from 'react-router-dom'
import { useAuthUser, useSignIn, useSignOut } from 'react-auth-kit'
import { SignInSchema, SignUpSchema } from '../utils/zod.schema'
import { useToastStore } from '../components/Toast'
import create from 'zustand'
import { useAxios } from './useAxios'

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
    const { addToast } = useToastStore()
    const auth = useAuthUser()
    const api = useAxios()

    const signIn = async (data: SignInSchema) =>
        await api
            .post('/auth/signin', data)
            .then((val) => {
                if (typeof val.data != 'object') throw new Error('Hahah')
                if ('err' in val.data) throw new Error(val.data.err)

                authSignIn({
                    token: val.data.token,
                    tokenType: 'token',
                    expiresIn: 60 * 60 * 24 * 7,
                    authState: { ...val.data.payload },
                })
                addToast({ msg: `Wellcome ${val.data.payload.name}` })
            })
            .catch((err: Error) => {
                addToast({
                    msg: err.message ?? 'Failed to signin',
                    type: 'error',
                })
            })

    const signUp = async (data: SignUpSchema) =>
        await api
            .post('/auth/signup', data)
            .then((val) => {
                if ('err' in val.data) throw new Error(val.data.err)
                addToast({ msg: 'Success signup' })
                navigate('/auth/signin')
            })
            .catch((err: Error) =>
                addToast({
                    msg: err.message ?? 'Failed to signup',
                    type: 'error',
                }),
            )

    const signOut = async () => {
        authSignOut()
        navigate('/auth/signin')
    }

    const authUser = () => auth() as UserData | null

    return { signIn, signUp, signOut, authUser } as const
}
export type UseAuthReturn = ReturnType<typeof useAuth>
