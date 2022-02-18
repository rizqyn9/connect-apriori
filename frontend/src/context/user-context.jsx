import React, { useEffect, useState } from 'react'

const initialData = {
    token: '',
    email: '',
    name: '',
    isAdmin: false,
}

const AuthContext = React.createContext({})

function AuthProvider({ children }) {
    const [userData, setUserData] = useState({
        ...initialData,
        ...JSON.parse(localStorage.getItem('user')),
        token: JSON.parse(localStorage.getItem('token')),
    })
    const [isAuth, setIsAuth] = useState(userData || getLocalStorage())

    useEffect(() => {
        if (!isAuth) {
            alert('Log out')
        }

        alert(JSON.stringify(userData))
    }, [isAuth])

    const getLocalStorage = () => {
        return JSON.parse(localStorage.getItem('user'))
    }

    const setLocalStorage = () => {}

    const signIn = (data) => {
        console.log(data)
    }

    const signUp = (data) => {
        console.log(data)
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
