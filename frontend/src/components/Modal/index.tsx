import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useKeyPress } from '../../hooks/useKeyPress'

export * from './Base'
export * from './ModalPayment'

type MainModalProps = {
    close: () => void
    children?: React.ReactNode
}

function MainModal({ close, children }: MainModalProps) {
    const closeEvent = useKeyPress('Escape')

    useEffect(() => {
        if (closeEvent) close()
    }, [closeEvent])

    return (
        <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.5 }}
            className="inset-0 grid place-content-center absolute bg-dark-1/60 z-30"
        >
            {children}
        </motion.div>
    )
}

type ModalPromoProps = MainModalProps & {}
function NewModalPromo(props: ModalPromoProps) {
    return (
        <MainModal close={props.close}>
            <div className="w-[20rem] h-[35rem] bg-dark-2 rounded-lg p-5 text-white">
                <div className="text-xl">Promo</div>
                <div>
                    <input name="promo" className="bg-dark-2 p-3 text-white" />
                </div>
            </div>
        </MainModal>
    )
}

export { MainModal, NewModalPromo }
