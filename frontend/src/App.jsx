import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'

import { SignIn, SignUp } from './pages/Auth'
import DashboardLayout from './pages/DashboardLayout'
import InputProduct from './pages/InputProduct'
import Catalog from './components/Catalog'

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
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Catalog />} />
                    <Route path={'/product'} element={<InputProduct />} />
                </Route>
                <Route path={'*'} element={<div>Notfound</div>} />
            </Routes>
        </CookiesProvider>
    )
}

export default App
