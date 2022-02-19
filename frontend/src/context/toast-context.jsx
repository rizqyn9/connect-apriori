import React, { useState, useContext } from 'react'

const ToastContext = React.createContext({})

function ToastProvider({ children }) {
    const [toast, setToast] = useState([])

    const addToast = () => {
        setToast([...toast, 1, 2])
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
