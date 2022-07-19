import React from 'react'
import ReactDom from 'react-dom'
import clsx from 'clsx'

function Modal({
    title,
    close,
    msg,
    content,
    action,
    children,
    className,
    disableClose = false,
}) {
    return (
        <div
            className={clsx(
                'bg-dark-1 rounded-xl min-h-[50vh] text-white p-5 flex flex-col relative',
                className
            )}
        >
            <button
                className="absolute h-[3rem] w-[3rem] right-[-1rem] top-[-1rem] rounded-full bg-primary"
                onClick={close}
                disable={String(disableClose)}
            >
                X
            </button>
            <div className="border-b-2 p-4 flex-shrink-0">
                <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div className="flex-grow flex flex-wrap">{children}</div>
        </div>
    )
}

function ModalContainer({ children }) {
    return ReactDom.createPortal(
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-30 grid place-content-center">
            <div className="relative w-full h-full">{children}</div>
        </div>,
        document.body
    )
}

function ModalFooter({ children }) {
    return <div className="w-full mt-5 -mb-2">{children}</div>
}

export { Modal, ModalContainer, ModalFooter }