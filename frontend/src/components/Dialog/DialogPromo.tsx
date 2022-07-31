import { Dialog } from '@headlessui/react'
import React from 'react'
import { axiosPrivate } from '../../services'
import { Button } from '../Button'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'

export type DialogPromoProps = DialogContainerProps & {}

export function DialogPromo(props: DialogContainerProps) {
    const getLatestScan = React.useCallback(() => {
        axiosPrivate.get('/test').then((val) => {
            console.log(val.data)
        })
    }, [])

    return (
        <DialogContainer {...props}>
            <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] h-max">
                <H1>Promo</H1>
                <div className="w-full h-full flex flex-col gap-5 items-center text-center">
                    <h2>Data</h2>
                    <div className="w-max flex flex-col min-w-[50%]">
                        <div className="py-2 flex justify-between w-full">
                            <span>Id</span>
                            <span>023123</span>
                        </div>
                        <div className="py-2 flex justify-between w-full">
                            <span>New customer</span>
                            <span>023123</span>
                        </div>
                    </div>
                    <Button onClick={getLatestScan}>Rescan</Button>
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}
