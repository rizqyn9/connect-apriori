import React from 'react'
import create from 'zustand'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

export type ToastStore = {
    toasts: Record<string, ToastProps>
    id: number
    generateId: () => number
    addToast: (toast: Omit<ToastProps, 'id'>) => void
    removeToast: (id: number) => void
}

const useToastStore = create<ToastStore>((set, get) => ({
    toasts: {},
    id: 0,
    generateId() {
        set({ id: get().id + 1 })
        return get().id
    },
    addToast(toast) {
        const { toasts, generateId } = get()
        set({ toasts: { ...toasts, [generateId()]: { ...toast } } })
    },
    removeToast(id: number) {
        const { toasts } = get()
        delete toasts[id]
        set(toasts)
    },
}))

function ToastContainer() {
    const { toasts } = useToastStore()

    const toastContainer = document.getElementById('toast-container')
    return (
        document.body &&
        createPortal(
            <div className="absolute top-0 w-full flex flex-col gap-2 items-center pt-5">
                <AnimatePresence>
                    {Object.entries(toasts).map(([key, val]) => (
                        <Toast key={key} {...val} id={Number(key)} />
                    ))}
                </AnimatePresence>
            </div>,
            toastContainer!,
        )
    )
}

type ToastProps = {
    id: number
    msg: string
    type?: ToastType
}

function Toast({ id, msg, type = 'success' }: ToastProps) {
    const { removeToast } = useToastStore()
    React.useEffect(() => {
        const timeOut = setTimeout(() => removeToast(id), 3_000)
        return () => clearTimeout(timeOut)
    }, [])

    return (
        <motion.div
            onClick={() => removeToast(id)}
            key={id}
            layout
            className={clsx(
                'border px-3 py-2 text-white rounded-md cursor-pointer w-[20rem] bg-dark-2',
                toastStyle[type],
            )}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            role={'status'}
        >
            {msg}
        </motion.div>
    )
}

type ToastType = 'error' | 'success'
const toastStyle: Record<ToastType, string> = {
    error: 'border-red-300',
    success: 'border-green-300',
}

export { Toast, ToastContainer, useToastStore }
