import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import DashboardLayout from './pages/DashboardLayout'
import { ProductPage } from './pages/InputProduct'
import Catalog from './components/Catalog'
import AccountManagement from './pages/AccountManagement'
import Analytics from './pages/Analytics'
import { RequireAuth } from './components/WithAuth'
import { AuthProvider } from 'react-auth-kit'
import { ToastContainer } from './components/Toast'
import Apriori from './pages/Apriori'
import { SignIn, SignUp } from './pages'

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth allowedRoles={['admin', 'casheer']}>
              <DashboardLayout />
            </RequireAuth>
          }
        >
          <Route
            index
            element={
              <RequireAuth allowedRoles={['admin', 'casheer']}>
                <Catalog />
              </RequireAuth>
            }
          />
          <Route
            path={'product/*'}
            element={
              <RequireAuth allowedRoles={['admin']}>
                <ProductPage />
              </RequireAuth>
            }
          />
          <Route path={'analytics'} element={<Analytics />} />
          <Route path={'admin/account-management'} element={<AccountManagement />} />
          <Route path={'apriori'} element={<Apriori />} />
        </Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="*" element={<Navigate to="/" />} />
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
