import React, { useEffect, useState } from 'react'
import { Modal, ModalContainer } from '../components/Modal'

const ModalContext = React.createContext({})

function ModalProvider({ children }) {
    const [modal, setModal] = useState(false)

    useEffect(() => {}, [modal])
    const activatedModal = ({ modalComponentProp }) => {
        setModal(modalComponentProp)
    }

    const closeModal = () => {
        setModal(null)
    }

    return (
        <ModalContext.Provider
            value={{ modal, setModal, activatedModal, closeModal }}
        >
            {modal && <ModalContainer modal={modal} />}
            {children}
        </ModalContext.Provider>
    )
}

const useModal = () => React.useContext(ModalContext)

export { ModalProvider, useModal }
