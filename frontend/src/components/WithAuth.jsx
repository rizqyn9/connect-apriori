import { Navigate } from 'react-router-dom'
import React from 'react'
import { useCookies } from 'react-cookie'

export function RequireAuth(WrappedComponent) {
    const [cookies] = useCookies(['user', 'token'])
    if (cookies.user && cookies.token) {
        return WrappedComponent
    } else {
        return <Navigate to={'/auth/signin'} replace />
    }
}
