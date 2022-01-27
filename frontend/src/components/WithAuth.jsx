import { getCurrentUser } from '../services'
import { Navigate } from 'react-router-dom'
import React from 'react'

export function RequireAuth(WrappedComponent) {
    const user = getCurrentUser()

    if (user) {
        return WrappedComponent
    } else {
        return <Navigate to={'/auth/signin'} replace />
    }
}
