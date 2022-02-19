import { useToast } from '../context/toast-context'
import React, { useEffect } from 'react'

function Toast() {
    const { removeToast } = useToast()

    useEffect(() => {
        const timer = setTimeout(() => {
            // alert('remove toast')
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <div
            className="bg-red-200 w-[15rem] p-3 rounded-md text-sm"
            style={{ transform: 'translateX(-10%)' }}
        >
            <h1>Toast</h1>
            <p>Message</p>
        </div>
    )
}

function ToastContainer() {
    const { toast } = useToast()

    return (
        <div className="flex flex-col gap-5 absolute top-5 right-0">
            {toast &&
                toast.length > 1 &&
                toast.map((val, i) => {
                    return <Toast key={i} />
                })}
        </div>
    )
}

export { Toast, ToastContainer }
