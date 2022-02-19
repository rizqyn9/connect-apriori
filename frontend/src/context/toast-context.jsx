import React, { useState, useContext, useEffect } from 'react'

const ToastContext = React.createContext({})

let id = 1

function ToastProvider({ children }) {
    const [toast, setToast] = useState({})

    useEffect(() => {
        console.log(toast)
    }, [toast])

    const addToast = ({ msg, title, variant, delay }) => {
        setToast({ ...toast, [id++]: { msg, title, variant, delay } })
    }

    const removeToast = () => {}

    return (
        <ToastContext.Provider
            value={{
                toast,
                setToast,
                addToast,
                removeToast,
            }}
        >
            {children}
        </ToastContext.Provider>
    )
}

const useToast = () => React.useContext(ToastContext)

export { ToastProvider, useToast }
