import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, signInService, signUpService } from '../services'
import { useToast } from './toast-context'

const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
})

const initialData = {
    isAuth: false,
    role: '',
    token: '',
    user: undefined,
}

const AuthContext = React.createContext(initialData)

function AuthProvider({ children }) {
    const { addToast } = useToast()
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])

    const [auth, setAuth] = useState(initialData)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth.isAuth) {
            localStorage.setItem('token', JSON.stringify(auth.token))
            localStorage.setItem('user', JSON.stringify(auth.user))
        }
    }, [auth])

    const verifyToken = () => {}

    // const verifyAuth = (useNavigate = true) => {
    //     if (cookies.name && cookies.user) return true
    //     if (useNavigate) navigate('/', { replace: true })
    //     else return false
    // }
    // const verifyAuth = true

    const getUserData = () => {
        let castCookie = cookies.user

        console.log(castCookie)
        if (castCookie) return castCookie
        else {
            logout()
            return null
        }
    }

    const signIn = async (data) => {
        try {
            return await signInService(data).then((val) => {
                if (val.data.isAuth) {
                    const { user, token, isAdmin } = val.data

                    setAuth({
                        ...auth,
                        ...val.data,
                        role: isAdmin ? ROLES.ADMIN : ROLES.USER,
                    })

                    addToast({
                        msg: `Success signin as ${user.name}`,
                        variant: 'success',
                    })

                    navigate('/dashboard', { replace: true })

                    return val.data
                } else {
                    addToast({
                        msg: "Email/Passsword doesn't match",
                        variant: 'error',
                    })
                }
                return val.data.isAuth
            })
        } catch (error) {
            console.log(error)
        }
    }

    const signUp = async (data) => {
        try {
            await signUpService(data).then((val) => {
                console.log(val.status)
                if (val.status === 'success') {
                    addToast({
                        msg: 'Success registered',
                        variant: 'success',
                    })
                } else {
                    addToast({
                        msg: val.message ?? 'server error',
                        title: 'SignUp',
                        variant: 'error',
                    })
                }
            })
        } catch (error) {
            console.log(error)
            addToast({
                msg: 'Server error',
                variant: 'error',
            })
        }
    }

    const signOut = () => {
        navigate('/auth/signin')
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                getUserData,
                removeCookie,
                auth,
                setAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth, ROLES }
