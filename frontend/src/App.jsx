import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { SignIn, SignUp } from './pages/Auth'
import DashboardLayout from './pages/DashboardLayout'
import InputProduct from './pages/InputProduct'
import Catalog from './components/Catalog'
import AccountManagement from './pages/AccountManagement'
import Analytics from './pages/Analytics'
import { RequireAuth } from './components/WithAuth'
import { OrderProvider } from './context/order-context'
import { AuthProvider, ROLES, useAuth } from './context/user-context'
import { CookiesProvider, useCookies } from 'react-cookie'
import { ToastProvider } from './context/toast-context'
import { ToastContainer } from './components/Toast'

/**
 * Fix every user login store token and user data to local storage
 * User without authorization will navigate to login page
 * Prevent authorized user to login page and redirect to latest page
 *
 */
function App() {
    return (
        <GlobalProvider>
            <ToastContainer />
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
                                {/* <Catalog /> */}
                            </RequireAuth>
                        }
                    />

                    {/* <Route
                        element={
                            <RequireAuth
                                allowedRoles={[ROLES.ADMIN, ROLES.USER]}
                            />
                        }
                    >
                        <Route path="/catalog" element={<Catalog />} />
                    </Route> */}
                    <Route path={'product'} element={<InputProduct />} />
                    <Route
                        path={'product-management'}
                        element={<Analytics />}
                    />
                    <Route
                        path={'admin/account-management'}
                        element={<AccountManagement />}
                    />
                </Route>
                <Route path="/auth/signin" element={<SignIn />} exact />
                <Route path="/auth/signup" element={<SignUp />} exact />
                <Route path={'*'} element={<div>Notfound</div>} />
                <Route path="/logout" element={<LogOut />} />
            </Routes>
        </GlobalProvider>
    )
}

function LogOut() {
    const { signOut } = useAuth()
    useEffect(() => {
        signOut()
    }, [])
    return <></>
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
