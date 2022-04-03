import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { useOrder } from '../hooks/useOrder'
import { useTransaction } from '../hooks/useTransaction'
import { OrderCard } from './OrderCard'
import { ModalPayment } from './Modal'
import { ModalPromo } from './Modal/ModalPromo'

export default function Order({ className }) {
    const [showOrder, setShowOrder] = useState(true)
    const [modalPayment, setModalPayment] = useState(false)
    const [modalScanPromo, setModalScanPromo] = useState(false)

    const { orders } = useOrder()

    const { transactionProcess, transaction } = useTransaction()

    useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <div
            className={clsx(
                'w-full flex-auto flex flex-col justify-around ',
                className
            )}
        >
            <div className="flex flex-col gap-2">
                {modalScanPromo && (
                    <ModalPromo close={() => setModalScanPromo(false)} />
                )}
                <p className={'text-md font-bold'}>Order-ID #423848234</p>
                <button
                    className="bg-primary p-2 rounded-md"
                    onClick={() => setModalScanPromo(true)}
                >
                    Gunakan promo
                </button>
                <p>status promo</p>
            </div>
            {/*Order Products*/}
            <div
                className={
                    'relative flex-1 overflow-y-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line pr-4 max-h-[50vh]'
                }
            >
                {showOrder &&
                    orders &&
                    Object.entries(orders).map(([key, val]) => {
                        return (
                            <OrderCard
                                key={key}
                                orderID={key}
                                id={val.id}
                                image={val.image}
                                price={val.price}
                                type={val.type}
                                menu={val.menu}
                                quantity={val.quantity}
                            />
                        )
                    })}
                {!showOrder && <Transaction close={() => setShowOrder(true)} />}
            </div>

            <div className={'my-5 text-sm text-white/70 flex flex-col gap-3'}>
                <div className={'flex justify-between'}>
                    <p>Diskon</p>
                    <p>{transaction.discount}</p>
                </div>{' '}
                <div className={'flex justify-between'}>
                    <p>Total Harga</p>
                    <p>{transaction.price}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Metode Pembayaran</p>
                    <p>{transaction.paymentMehod ?? '-'}</p>
                </div>
            </div>
            {showOrder ? (
                <button
                    className={
                        'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed'
                    }
                    disabled={Object.keys(orders).length == 0}
                    onClick={() => setShowOrder(!showOrder)}
                >
                    Metode pembayaran
                </button>
            ) : (
                <button
                    className={
                        'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed'
                    }
                    disabled={
                        transaction.paymentType == '' || transactionProcess
                    }
                    onClick={() => setModalPayment(true)}
                >
                    Buat order
                </button>
            )}
            {modalPayment && (
                <ModalPayment close={() => setModalPayment(false)} />
            )}
        </div>
    )
}

function Transaction({ show, close }) {
    const { transaction, setPaymentMethod, transactionVariants } =
        useTransaction()

    const handleBack = () => {
        close()
        setPaymentMethod(null)
    }

    return (
        <div className="flex flex-col gap-5 max-h-full">
            <div className="sticky top-0 bg-dark-2 z-10 w-full pb-3">
                <button
                    onClick={handleBack}
                    className="border-2 border-primary px-3 py-2 rounded-md w-full"
                >
                    back
                </button>
            </div>
            <div className="">
                <div className="grid w-full gap-5 grid-cols-2">
                    {transactionVariants.map((val, i) => {
                        return (
                            <TransactionTypeCard
                                key={i}
                                type={val.type}
                                setTransaction={setPaymentMethod}
                                transactionType={transaction.paymentMehod}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

function TransactionTypeCard({ type, setTransaction, transactionType }) {
    return (
        <button
            onClick={() => {
                setTransaction(type)
            }}
            className={clsx(
                'w-full aspect-w-1 aspect-h-1 border-2 rounded-md flex justify-center items-center',
                { 'bg-primary': transactionType == type }
            )}
        >
            <div className="flex items-center justify-center">{type}</div>
        </button>
    )
}

/**
 * Component Modal untuk melanjutkan pembayaran
 */

// function ModalPayment({ order, transaction }) {
//     const [transactionStatus, setTransactionStatus] = useState(null)
//     const { closeModal } = useModal()
//     const { createTransaction, transactionProcess } = useTransaction()

//     const handleCreateTransaction = async () => {
//         await createTransaction({ order, transaction }).then(() =>
//             setTransactionStatus(true)
//         )
//     }

//     const handleCancel = () => {
//         closeModal()
//     }

//     useEffect(() => {
//         // console.log('Transacto', transactionProcess)
//     }, [transactionProcess])

//     return (
//         <Modal title={'Pembayaran'} className="min-w-[30vw]">
//             {transactionProcess && (
//                 <div className="flex flex-col w-full gap-5 items-center justify-center">
//                     <Spinner />
//                     <p>Create transaction</p>
//                 </div>
//             )}
//             {!transactionProcess && transactionStatus && (
//                 <PaymentStatus
//                     isSucces={true}
//                     closeModal={closeModal}
//                     setTransactionStatus={setTransactionStatus}
//                 />
//             )}
//             {!transactionProcess && !transactionStatus && (
//                 <div className="flex flex-col justify-between w-full">
//                     <div className="py-5">
//                         <p className="text-lg font-bold">
//                             Metode pembayaran {transaction?.paymentType}
//                         </p>
//                         <table className="w-full mt-4">
//                             <thead>
//                                 <tr className="bg-dark-2">
//                                     <td className="">Menu</td>
//                                     <td className="text-center">Type</td>
//                                     <td className="text-center">Jumlah</td>
//                                     <td className="text-right">Harga</td>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Array.isArray(order) &&
//                                     order.map((val, i) => (
//                                         <OrderMapPayment
//                                             props={val}
//                                             key={i}
//                                             type={val.type}
//                                             namaMenu={val.menu}
//                                             hargaMenu={val.totalPrice}
//                                             quantity={val.quantity}
//                                         />
//                                     ))}
//                             </tbody>
//                         </table>
//                     </div>
//                     <div>{JSON.stringify(transaction)}</div>
//                     {/* Button Container */}
//                     <div className="p-5 flex gap-5 items-center justify-center">
//                         <button
//                             onClick={() => handleCancel()}
//                             className="rounded-md border-2 border-primary px-4 py-2"
//                         >
//                             Batal
//                         </button>
//                         <button
//                             onClick={() => handleCreateTransaction()}
//                             className="rounded-md bg-primary px-4 py-2"
//                         >
//                             Terima pembayran
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </Modal>
//     )
// }
