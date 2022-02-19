import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { signInService, signUpService } from '../services'
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
    const [userData, setUserData] = useState({
        ...initialData,
        ...JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('token')),
    })

    const [isAuth, setIsAuth] = useState(cookies.token)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            alert('Log out')
        }
        setCookie('token', { data: 'asdasd' }, { path: '*' })
    }, [isAuth])

    const getLocalStorage = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const setLocalStorage = () => {}

    const verifyToken = () => {}

    const verifyAuth = () => {
        console.log('go dashboard')
        navigate('/', { replace: true })
    }

    const signIn = async (data) => {
        try {
            await signInService(data).then((val) => {
                if (val.data.isAuth) {
                    navigate('/')
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
                userData,
                setUserData,
                getLocalStorage,
                setLocalStorage,
                signIn,
                signUp,
                signOut,
                verifyAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
