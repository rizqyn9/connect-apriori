import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
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

    const verifyAuth = () => {}

    const signIn = async (data) => {
        try {
            await signInService(data)
                .then((val) => {
                    if (val.data.isAuth) {
                        console.log('auth')
                    } else {
                        console.log('no auth')
                    }
                })
                .catch((e) => console.log(e))
        } catch (error) {
            console.log(error)
        }
    }

    const signUp = async (data) => {
        console.log(data)
        try {
            await signUpService(data).then((val) => {
                console.log(val.status)
                if (val.status === 'success') {
                    addToast({})
                } else {
                    addToast({
                        msg: 'asdasd',
                        title: 'asdasd',
                        variant: 'error',
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const signOut = () => {}

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
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext)

export { AuthProvider, useAuth }
