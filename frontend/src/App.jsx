import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignIn, SignUp } from './pages/Auth'
import Dashboard from './pages/Dashboard'
import { CookiesProvider, useCookies } from 'react-cookie'

function App() {
    const [cookies, setCookies] = useCookies(['token'])

    useEffect(() => {
        setCookies('token', 'tes')
    }, [])

    return (
        <CookiesProvider>
            <Routes>
                <Route path="/auth/signin" element={<SignIn />} exact />
                <Route path="/auth/signup" element={<SignUp />} exact />
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </CookiesProvider>
    )
}

export default App
