import { useToast } from '../context/toast-context'
import React, { useEffect } from 'react'
import clsx from 'clsx'

const variantStyle = {
    success: 'border-green-400 text-green-700',
    warning: 'border-yellow-400 text-yellow-700',
    error: 'border-red-400 text-red-400',
}

function Toast({ id, msg, title = '', delay = 0, variant = 'success' }) {
    const { removeToast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(id)
        }, 1000)
        // console.log(variant)
        return () => {
            clearTimeout(timer)
        }
    }, [id, removeToast])

    return (
        <div
            className={clsx(
                'w-[15rem] p-3 border-l-4 bg-white rounded-md text-sm',
                variantStyle[variant]
            )}
            style={{ transform: 'translateX(-10%)' }}
        >
            {title && <h1>{title}</h1>}
            <p>{msg ?? 'Message empty'}</p>
        </div>
    )
}

function ToastContainer() {
    const { toast } = useToast()

    return (
        <div className="flex flex-col gap-5 absolute top-5 right-0">
            {toast.length > 0 &&
                toast.map((val) => <Toast key={val.id} {...val} />)}
        </div>
    )
}

export { Toast, ToastContainer }
