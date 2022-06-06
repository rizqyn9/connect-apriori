import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout, signInService, signUpService } from '../services'
import { useToast } from './toast-context'
import { useAxiosPrivate } from '../hooks/useAxiosPrivate'

const ROLES = Object.freeze({
    ADMIN: 'admin',
    USER: 'user',
})

const initialData = {
    firstLoad: true,
    isAuth: false,
    role: '',
    token: '',
    user: undefined,
}

const AuthContext = React.createContext(initialData)

function AuthProvider({ children }) {
    const { addToast } = useToast()
    const [cookies, setCookie, removeCookie] = useCookies(['user', 'token'])
    const axiosPrivate = useAxiosPrivate()

    const [auth, setAuth] = useState(initialData)
    const navigate = useNavigate()

    /**
     * Update cookies setiap ada pembaruan data user
     */
    useEffect(async () => {
        if (!auth.isAuth && cookies.token) {
            // await verifyCookiesToken()
        }
        if (auth.isAuth && auth.token && auth.user) {
            setCookie('token', auth.token, { path: '/' })
            setCookie('user', auth.user, { path: '/' })
        }
    }, [auth])

    const signIn = async (data) => {
        try {
            return await signInService(data).then((val) => {
                if (val.isAuth) {
                    const { user, token, isAdmin } = val

                    setAuth({
                        ...auth,
                        ...val,
                        user,
                        isAuth: true,
                        role: isAdmin ? ROLES.ADMIN : ROLES.USER,
                        firstLoad: false,
                    })

                    addToast({
                        msg: `Success signin as ${user.name}`,
                        variant: 'success',
                    })

                    navigate('/', { replace: true })

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

    const verifyCookiesToken = async () => {
        try {
            console.log(cookies.token)
            return await axiosPrivate
                .post('/auth/validate', { token: cookies.token })
                .then((val) => {
                    if (val.data.isAuth) {
                        const { user, token } = val.data
                        setAuth({
                            ...auth,
                            ...val,
                            user,
                            isAuth: true,
                            role: user.isAdmin ? ROLES.ADMIN : ROLES.USER,
                        })
                        navigate('/', { replace: true })

                        return val
                    } else {
                        throw new Error('Invalid Token')
                    }
                })
                .catch((e) => {
                    console.log(e)
                    throw new Error('Invalid Token')
                })
        } catch (error) {
            signOut()
            console.log('Token', error)
        }
    }

    const signOut = () => {
        setAuth(initialData)
        removeCookie('token', { path: '/' })
        removeCookie('user', { path: '/' })
        navigate('/auth/signin')
    }

    const TestFunction = () => {
        alert('asd')
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                removeCookie,
                cookies,
                auth,
                setAuth,
                verifyCookiesToken,
                TestFunction,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth, ROLES }
