import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../Button'
import { H1 } from '../Typography'

type DialogChangePasswordProps = {
    isOpen: boolean
    setIsOpen: (arg: boolean) => void
}

export function DialogChangePassword(props: DialogChangePasswordProps) {
    return (
        <Transition show={props.isOpen} as={Fragment}>
            <Dialog
                open={props.isOpen}
                onClose={() => props.setIsOpen(false)}
                className="fixed inset-0 bg-black/40 grid place-content-center"
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
                    <Dialog.Panel className="text-white bg-dark-2 p-8 rounded-lg border-white border">
                        <H1>Change Password</H1>
                        <form>
                            <label>
                                <p>Email</p>
                                <input />
                            </label>
                            <label>
                                <p>Email</p>
                                <input />
                            </label>
                            <label>
                                <p>Email</p>
                                <input />
                            </label>
                            <div className="flex items-end justify-end gap-5 py-4">
                                <Button
                                    className="w-1/3"
                                    onClick={() => props.setIsOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="w-1/3"
                                    onClick={() => props.setIsOpen(false)}
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    )
}
