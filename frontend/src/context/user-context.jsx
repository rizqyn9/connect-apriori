import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, signInService, signUpService } from '../services'
import { useToast } from './toast-context'

const initialData = {
    token: '',
    email: '',
    name: '',
    isAdmin: false,
}

const AuthContext = React.createContext(initialData)

function AuthProvider({ children }) {
    const { addToast } = useToast()
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])

    const [userData, setUserData] = useState(cookies.user)
    const [isAuth, setIsAuth] = useState(cookies.token)
    const navigate = useNavigate()

    useEffect(() => {
        // if (!isAuth) {
        //     alert('Log out')
        // }
    }, [isAuth])

    const verifyToken = () => {}

    // const verifyAuth = (useNavigate = true) => {
    //     if (cookies.name && cookies.user) return true
    //     if (useNavigate) navigate('/', { replace: true })
    //     else return false
    // }
    const verifyAuth = true

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
            return await signInService(data)
                .then((val) => {
                    if (val.data.isAuth) {
                        setCookie('user', val.data.user, { path: '*' })
                        setCookie('token', val.data.token, { path: '*' })

                        addToast({
                            msg: 'Success signin',
                            variant: 'success',
                        })
                    } else {
                        addToast({
                            msg: "Email/Passsword doesn't match",
                            variant: 'error',
                        })
                    }
                    return val.data.isAuth
                })
                .then(() => navigate('/dashboard', { replace: true }))
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
                verifyAuth,
                getUserData,
                cookies,
                userData,
                setUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
