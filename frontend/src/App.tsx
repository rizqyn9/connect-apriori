import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { SignIn, SignUp } from './pages/Auth'
import DashboardLayout from './pages/DashboardLayout'
import { ProductPage } from './pages/InputProduct'
import Catalog from './components/Catalog'
import AccountManagement from './pages/AccountManagement'
import Analytics from './pages/Analytics'
import { RequireAuth } from './components/WithAuth'
import { ROLES } from './hooks/useAuth'
import { AuthProvider } from 'react-auth-kit'
import { ToastContainer } from './components/Toast'
import Apriori from './pages/Apriori'
import ConfigPage from './pages/Config'

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
                            <RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.USER]}>
                                <Catalog />
                            </RequireAuth>
                        }
                    />
                    <Route path={'product/*'} element={<ProductPage />} />
                    <Route path={'product-management'} element={<Analytics />} />
                    <Route path={'admin/account-management'} element={<AccountManagement />} />
                    <Route path={'apriori'} element={<Apriori />} />
                    <Route path={'config'} element={<ConfigPage />} />
                </Route>
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path={'*'} element={<Navigate to="/" />} />
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
            <AuthProvider authType="cookie" authName="c_connect">
                <ToastContainer />
                {children}
            </AuthProvider>
        </CookiesProvider>
    )
}

export default App
