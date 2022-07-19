import { Dialog } from '@headlessui/react'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'

export type DialogPromoProps = DialogContainerProps & {}

export function DialogPromo(props: DialogContainerProps) {
    return (
        <DialogContainer {...props}>
            <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] h-[80vh]">
                <H1>Promo</H1>
                <form>
                    <input value={'asdad'} />
                </form>
            </Dialog.Panel>
        </DialogContainer>
    )
}
