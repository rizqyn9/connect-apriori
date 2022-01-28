import { getCurrentUser, getToken } from '../services'
import { Navigate } from 'react-router-dom'
import React from 'react'

export function RequireAuth(WrappedComponent) {
    const token = getToken()
    if (token) {
        return WrappedComponent
    } else {
        console.log('with auth')
        return <Navigate to={'/auth/signin'} replace />
    }
}
