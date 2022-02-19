import React, { useState, useContext, useEffect } from 'react'

const ToastContext = React.createContext({})

let id = 1

function ToastProvider({ children }) {
    const [toast, setToast] = useState([])

    useEffect(() => {
        console.log(toast)
    }, [toast])

    const addToast = ({ msg, title, variant, delay }) => {
        setToast([...toast, { msg, title, variant, delay, id: id++ }])
    }

    const removeToast = (idTarget) => {
        setToast((toast) => toast.filter((t) => t.id !== idTarget))
    }

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
