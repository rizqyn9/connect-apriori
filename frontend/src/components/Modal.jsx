import React from 'react'
import { useModal } from '../context/modal-context'

function Modal({ title, msg, content, action, children }) {
    const { closeModal } = useModal()
    return (
        <div className="bg-dark-1 rounded-xl min-w-[50vw] min-h-[50vh] text-white p-5 flex flex-col relative">
            <button
                className="absolute h-[3rem] w-[3rem] right-[-1rem] top-[-1rem] rounded-full bg-primary"
                onClick={closeModal}
            >
                X
            </button>
            <div className="border-b-2 p-4">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div className="p-4 py-8">{children}</div>
        </div>
    )
}

function ModalContainer({ modal }) {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-30 grid place-content-center">
            <div className="relative w-full h-full">{modal}</div>
        </div>
    )
}

export { Modal, ModalContainer }
