import React from 'react'
import { signInService, signUpService } from '../services'
import { useNavigate } from 'react-router-dom'
import { useAxiosPrivate } from '../hooks/useAxiosPrivate'
import { useAuthUser, useSignIn, useSignOut } from 'react-auth-kit'

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

    const signIn = async (data) =>
        signInService(data)
            .then((val) => {
                authSignIn({
                    token: val.data.token,
                    tokenType: 'token',
                    expiresIn: 60 * 60 * 24 * 7,
                    authState: { ...val.data.user },
                })
            })
            .catch((val) => console.log(val))

    const signUp = (data) =>
        signUpService(data)
            .then((val) => navigate('/auth/signin'))
            .catch((err) => console.log(err))

    const signOut = () => {
        authSignOut()
        navigate('/auth/signin')
    }

    const authUser = auth()

    return { signIn, signUp, signOut, authUser }
}
