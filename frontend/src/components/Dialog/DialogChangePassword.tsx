import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Button } from '../Button'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'

type DialogChangePasswordProps = DialogContainerProps & {}

export function DialogChangePassword(props: DialogChangePasswordProps) {
    return (
        <DialogContainer {...props}>
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
        </DialogContainer>
    )
}
