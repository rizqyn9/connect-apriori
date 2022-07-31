import { useCallback, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { TD, TH, TR } from '.'
import { Button } from '../Button'
import { DialogContainer } from '../Dialog/DialogContainer'
import { H1 } from '../Typography'
import { axiosPrivate } from '../../services'
import { useAnalyticsStore } from '../../hooks/useAnalytics'
import { useToastStore } from '../Toast'

type TableAnalyticTransactionProps = {
    data: TransactionData[]
    update(): void
}

type TransactionData = {
    orderList: string[]
    paymentMethod: string
    price: number
    _id: string
}

export function TableAnalyticTransaction(props: TableAnalyticTransactionProps) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteData, setDeleteData] = useState<TransactionData | null>(null)
    const { getAllAnalytics } = useAnalyticsStore()
    const { addToast } = useToastStore()

    const handleRemove = (data: TransactionData) => {
        setDeleteData(data)
        if (!deleteData) return
        setDeleteOpen(true)
    }

    const handleCancel = useCallback(() => handleClose(), [])

    const handleOK = useCallback(() => {
        const id = deleteData?._id
        doDelete(id!)
            .then(() => {
                addToast({ msg: `Success delete ${id}` })
                handleClose()
                props.update()
            })
            .catch(() => addToast({ msg: `Failed to delete ${id}`, type: 'error' }))
    }, [deleteData])

    const handleClose = useCallback(() => {
        setDeleteData(null)
        setDeleteOpen(false)
    }, [])

    const doDelete = async (id: string) => await axiosPrivate.delete(`/transaction/${id}`)

    return (
        <>
            <DialogDelete deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} handleCancel={handleCancel} handleOK={handleOK} />
            <table className="w-full bg-dark-2 rounded-lg">
                <thead>
                    <tr className="bg-primary">
                        <TH>No</TH>
                        <TH>ID Transaction</TH>
                        <TH>Price</TH>
                        <TH>Action</TH>
                    </tr>
                </thead>
                <tbody className="border-2 border-white">
                    {props.data.length == 0 ? (
                        <TR className="text-center">
                            <TD className="py-8" colSpan={4}>
                                Data Not found
                            </TD>
                        </TR>
                    ) : (
                        props.data.map((val, i) => (
                            <TR key={i}>
                                <TD className="p-2 text-center" width={100}>
                                    {i + 1}
                                </TD>
                                <TD>{val._id}</TD>
                                <TD>{val.price}</TD>
                                <TD className="flex gap-5 justify-center">
                                    <Button onClick={() => handleRemove(val)}>Remove</Button>
                                </TD>
                            </TR>
                        ))
                    )}
                </tbody>
            </table>
        </>
    )
}

function DialogDelete({ deleteOpen, setDeleteOpen, handleCancel, handleOK }) {
    return (
        <DialogContainer isOpen={deleteOpen} setIsOpen={setDeleteOpen}>
            <Dialog.Panel className="bg-dark-2 border border-white p-5 text-white rounded-lg w-[50vw] h-max flex flex-col">
                <H1>Delete transaction</H1>
                <div className="w-full h-full flex flex-col gap-5 items-center text-center">
                    <div className="flex gap-5">
                        <Button className="w-24 bg-transparent border border-primary" onClick={handleCancel}>
                            No
                        </Button>
                        <Button className="w-24 bg-red-600" onClick={handleOK}>
                            Yes
                        </Button>
                    </div>
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}
