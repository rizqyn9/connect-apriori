import React from 'react'
import { useOrder } from '../../hooks/useOrder'
import { useTransaction } from '../../hooks/useTransaction'
import { Modal, ModalContainer } from '../Modal/Base'

function ModalPayment({ close }) {
    const { orders } = useOrder()
    const { transaction } = useTransaction()

    return (
        <ModalContainer>
            <Modal title={'Pembayaran'} className="min-w-[40vw]" close={close}>
                <div className="flex flex-col justify-between w-full">
                    <div className="py-5">
                        <p className="text-lg font-bold">
                            Metode pembayaran {transaction?.paymentType}
                        </p>
                        <table className="w-full mt-4">
                            <thead>
                                <tr className="bg-dark-2">
                                    <td className="">Menu</td>
                                    <td className="text-center">Type</td>
                                    <td className="text-center">Jumlah</td>
                                    <td className="text-right">Harga</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/**
                                 *! TODO
                                 */}
                                {Object.entries(orders).map(([key, val]) => {})}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </ModalContainer>
    )
}

export { ModalPayment }
