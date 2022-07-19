import { Dialog } from '@headlessui/react'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'

type DialogPaymentProps = DialogContainerProps & {}

export function DialogPayment(props: DialogPaymentProps) {
    return (
        <DialogContainer {...props}>
            <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] h-[80vh]">
                <H1>Payment</H1>
            </Dialog.Panel>
        </DialogContainer>
    )
}
