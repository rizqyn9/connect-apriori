import clsx from 'clsx'
import React, { useTransition } from 'react'
import { useOrderStore } from '../hooks/useOrder'
import {
    useTransactionStore,
    paymentMethodExist,
    PaymentMethod,
} from '../hooks/useTransaction'
import { OrderCard } from './OrderCard'
import { ModalPayment } from './Modal'
import { ModalPromo } from './Modal/ModalPromo'

type OrderContainerProps = {
    className: string
}
export default function Order({ className }: OrderContainerProps) {
    const [showOrder, setShowOrder] = React.useState(true)
    const [modalPayment, setModalPayment] = React.useState(false)
    const [modalScanPromo, setModalScanPromo] = React.useState(false)
    const { orders } = useOrderStore()

    const { props, setProps, state } = useTransactionStore()

    React.useEffect(() => {
        console.log(orders)
    }, [orders])

    return (
        <div
            className={clsx(
                'w-full flex-auto flex flex-col justify-around ',
                className,
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
            <div className="relative flex-1 overflow-y-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line pr-4 max-h-[50vh]">
                {showOrder &&
                    orders &&
                    Object.entries(orders).map(([key, val]) => (
                        <OrderCard key={key} {...val} orderId={key} />
                    ))}

                {!showOrder && <Transaction close={() => setShowOrder(true)} />}
            </div>

            <div className={'my-5 text-sm text-white/70 flex flex-col gap-3'}>
                <div className={'flex justify-between'}>
                    <p>Diskon</p>
                    <p>{props.promo ?? 'none'}</p>
                </div>{' '}
                <div className={'flex justify-between'}>
                    <p>Total Harga</p>
                    <p>{props.total}</p>
                </div>
                <div className={'flex justify-between'}>
                    <p>Metode Pembayaran</p>
                    <p>{props.method ?? '-'}</p>
                </div>
            </div>
            {showOrder ? (
                <button
                    className="text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed"
                    disabled={Object.keys(orders).length == 0}
                    onClick={() => setShowOrder(!showOrder)}
                >
                    Metode pembayaran
                </button>
            ) : (
                <button
                    className="text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80 disabled:bg-gray-700 disabled:cursor-not-allowed"
                    disabled={props.method == null || state == 'create'}
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

function Transaction({ close }: { close: () => void }) {
    const { setProps } = useTransactionStore()

    const handleBack = () => {
        setProps('method', null)
        close()
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
                    {paymentMethodExist.map((val, i) => (
                        <TransactionTypeCard key={i} type={val} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function TransactionTypeCard({ type }: { type: PaymentMethod }) {
    const { props, setProps } = useTransactionStore()
    return (
        <button
            onClick={() => setProps('method', type)}
            className={clsx(
                'w-full aspect-w-1 aspect-h-1 border-2 rounded-md flex justify-center items-center',
                { 'bg-primary': props.method == type },
            )}
        >
            <div className="flex items-center justify-center uppercase">
                {type}
            </div>
        </button>
    )
}
