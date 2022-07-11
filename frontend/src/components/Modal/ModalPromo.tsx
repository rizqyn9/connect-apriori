import React from 'react'
import { Modal, ModalContainer } from '.'

function ModalPromo({ close }) {
    return (
        <ModalContainer>
            <Modal title={'Scan'} close={close}>
                <div className="flex flex-col gap-5">
                    <input type={'text'} className="p-2 bg-form" />
                    <button>Menunggu scan</button>
                </div>
            </Modal>
        </ModalContainer>
    )
}

export { ModalPromo }
