import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'

import { SignIn, SignUp } from './pages/Auth'
import DashboardLayout from './pages/DashboardLayout'
import InputProduct from './pages/InputProduct'
import Catalog from './components/Catalog'
import AccountManagement from './pages/AccountManagement'
import ProductManagement from './pages/ProductManagement'
import Analytics from './pages/Analytics'
import { RequireAuth } from './components/WithAuth'
import { OrderProvider } from './context/order-context'

function App() {
    const [cookies, setCookies] = useCookies(['token'])

    useEffect(() => {
        setCookies('token', 'tes')
    }, [])

    return (
        <CookiesProvider>
            <OrderProvider>
                <Routes>
                    <Route path="/auth/signin" element={<SignIn />} exact />
                    <Route path="/auth/signup" element={<SignUp />} exact />
                    <Route path="/" element={RequireAuth(<DashboardLayout />)}>
                        <Route index element={<Catalog />} />
                        <Route path={'/product'} element={<InputProduct />} />
                        <Route
                            path={'/product-management'}
                            element={<Analytics />}
                        />
                        <Route
                            path={'/admin/account-management'}
                            element={<AccountManagement />}
                        />
                    </Route>
                    <Route path={'*'} element={<div>Notfound</div>} />
                </Routes>
            </OrderProvider>
        </CookiesProvider>
    )
}

export default App
