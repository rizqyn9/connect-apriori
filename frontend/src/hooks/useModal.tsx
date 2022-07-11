import create from 'zustand'
import { createPortal } from 'react-dom'
import { AnimatePresence } from 'framer-motion'

type ModalStore = {
    active: boolean
    children: React.ReactNode
    setActive(
        arg:
            | { active: true; children: React.ReactNode }
            | { active: false; children?: never },
    ): void
}
const useModalStore = create<ModalStore>((set, get) => ({
    active: false,
    children: null,
    setActive({ active, children }) {
        if (!active) children = null
        set({ active, children })
    },
}))

const ModalContainer = () => {
    const { active, children } = useModalStore()

    const modalContainer = document.getElementById('modal')
    return active && children && modalContainer
        ? createPortal(
              <AnimatePresence>{children}</AnimatePresence>,
              modalContainer,
          )
        : null
}

export { useModalStore, ModalContainer }
