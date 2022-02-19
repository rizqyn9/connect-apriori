import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignIn, SignUp } from './pages/Auth'
import DashboardLayout from './pages/DashboardLayout'
import InputProduct from './pages/InputProduct'
import Catalog from './components/Catalog'
import AccountManagement from './pages/AccountManagement'
import Analytics from './pages/Analytics'
import { RequireAuth } from './components/WithAuth'
import { OrderProvider } from './context/order-context'
import { AuthProvider } from './context/user-context'
import { CookiesProvider } from 'react-cookie'
import { ToastProvider } from './context/toast-context'
import { ToastContainer } from './components/Toast'

function App() {
    return (
        <GlobalProvider>
            <ToastContainer />
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
        </GlobalProvider>
    )
}

function GlobalProvider({ children }) {
    return (
        <CookiesProvider>
            <ToastProvider>
                <AuthProvider>
                    <OrderProvider>{children}</OrderProvider>
                </AuthProvider>
            </ToastProvider>
        </CookiesProvider>
    )
}

export default App
