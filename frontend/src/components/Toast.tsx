import React from 'react'
import create from 'zustand'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

type ToastStore = {
    toasts: Record<string, ToastProps>
    id: number
    generateId: () => number
    addToast: (toast: ToastProps) => void
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
        const { toasts, id: current } = get()
        set({
            toasts: { ...toasts, [current]: { ...toast } },
            id: current + 1,
        })
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
    return createPortal(
        <div className="absolute top-0 w-full flex flex-col gap-2 items-center">
            <AnimatePresence>
                {Object.entries(toasts).map(([key, val]) => (
                    <Toast key={key} {...val} />
                ))}
            </AnimatePresence>
        </div>,
        toastContainer!,
    )
}

type ToastProps = {
    id: number
    msg: string
}

function Toast({ id, msg }: ToastProps) {
    const { removeToast } = useToastStore()
    React.useEffect(() => {
        const timeOut = setTimeout(() => {
            removeToast(id)
        }, 3_000)
        return () => clearTimeout(timeOut)
    }, [])

    return (
        <motion.div
            onClick={() => removeToast(id)}
            key={id}
            layout
            className="border bg-primary px-3 py-1 text-white rounded-md cursor-pointer"
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.5 }}
            role={'status'}
        >
            Alert !! {msg}
        </motion.div>
    )
}

export { Toast, ToastContainer, useToastStore }
