import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignIn, SignUp } from './pages/Auth.tsx'
import DashboardLayout from './pages/DashboardLayout'
import { ProductPage } from './pages/InputProduct'
import Catalog from './components/Catalog'
import AccountManagement from './pages/AccountManagement'
import Analytics from './pages/Analytics'
import { RequireAuth } from './components/WithAuth'
import { OrderProvider } from './context/order-context'
import { ROLES } from './hooks/useAuth'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'jotai'
import { AuthProvider } from 'react-auth-kit'
import { ToastContainer } from './components/Toast'

function App() {
    return (
        <GlobalProvider>
            <Routes>
                <Route
                    path="/"
                    element={
                        <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                            <DashboardLayout />
                        </RequireAuth>
                    }
                >
                    <Route
                        index
                        element={
                            <RequireAuth
                                allowedRoles={[ROLES.ADMIN, ROLES.USER]}
                            >
                                <Catalog />
                            </RequireAuth>
                        }
                    />
                    <Route path={'product/*'} element={<ProductPage />} />
                    <Route
                        path={'product-management'}
                        element={<Analytics />}
                    />
                    <Route
                        path={'admin/account-management'}
                        element={<AccountManagement />}
                    />
                </Route>
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path={'*'} element={<div>Notfound</div>} />
                <Route path="/logout" element={<LogOut />} />
            </Routes>
        </GlobalProvider>
    )
}

function LogOut() {
    // const { signOut } = useAuth()
    useEffect(() => {
        // signOut()
    }, [])
    return null
}

function GlobalProvider({ children }: { children: React.ReactNode }) {
    return (
        <CookiesProvider>
            <Provider>
                <AuthProvider authType="cookie" authName="c_connect">
                    <ToastContainer />
                    <OrderProvider>{children}</OrderProvider>
                </AuthProvider>
            </Provider>
        </CookiesProvider>
    )
}

export default App
