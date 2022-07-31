import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export type DialogContainerProps = {
    children?: React.ReactNode
    isOpen: boolean
    setIsOpen(arg: boolean): void
}

export function DialogContainer(props: DialogContainerProps) {
    return (
        <Transition show={props.isOpen} as={Fragment}>
            <Dialog
                open={props.isOpen}
                onClose={() => props.setIsOpen(false)}
                className="fixed inset-0 z-10 bg-black/40 grid place-content-center"
            >
                <Transition.Child
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                    as={Fragment}
                >
                    {props.children}
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
