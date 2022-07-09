import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useSignIn, useSignOut } from 'react-auth-kit'

import { signInService, signUpService } from '../services'
import { useAxiosPrivate } from './useAxiosPrivate'
import { SignInSchema, SignUpSchema } from '../utils/zod.schema'
import api from '../services/index'

export const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
})

export function useAuth() {
    const navigate = useNavigate()
    const authSignIn = useSignIn()
    const authSignOut = useSignOut()
    const auth = useAuthUser()
    const axiosPrivate = useAxiosPrivate()

    const signIn = async (data: SignInSchema) => {
        return await api
            .post('/auth/signin', data)
            .then((val) => {
                authSignIn({
                    token: val.data.token,
                    tokenType: 'token',
                    expiresIn: 60 * 60 * 24 * 7,
                    authState: { ...val.data.user },
                })
            })
            .catch((err) => console.log(err))
    }

    const signUp = (data: SignUpSchema) =>
        signUpService(data)
            .then((val) => navigate('/auth/signin'))
            .catch((err) => console.log(err))

    const signOut = () => {
        authSignOut()
        navigate('/auth/signin')
    }

    const authUser = auth()

    return { signIn, signUp, signOut, authUser } as const
}

export type UseAuthReturn = ReturnType<typeof useAuth>
