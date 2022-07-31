import clsx from 'clsx'
import React from 'react'
import { useOrderStore } from '../hooks/useOrder'
import {
    useTransactionStore,
    paymentMethodExist,
    PaymentMethod,
} from '../hooks/useTransaction'
import { OrderCard } from './OrderCard'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from './Button'
import { DialogPayment } from './Dialog/DialogPayment'
import { DialogPromo } from './Dialog/DialogPromo'

type OrderContainerProps = {
    className: string
}
export default function Order({ className }: OrderContainerProps) {
    const [isDialogPayment, setIsDialogPayment] = React.useState(false)
    const [isDialogPromo, setIsDialogPromo] = React.useState(false)
    const { orders, state: orderState, updateState } = useOrderStore()

    const { props, setProps, state, recalculate } = useTransactionStore()

    React.useEffect(recalculate, [])

    return (
        <>
            <DialogPromo isOpen={isDialogPromo} setIsOpen={setIsDialogPromo} />
            <DialogPayment
                isOpen={isDialogPayment}
                setIsOpen={setIsDialogPayment}
            />
            <div
                className={clsx(
                    'w-full max-h-[calc(100%-5rem)] flex flex-col justify-between text-sm',
                    className,
                )}
            >
                <div className="flex flex-col">
                    <Button onClick={() => setIsDialogPromo(true)}>
                        Gunakan promo
                    </Button>
                    <p className="mt-3 mb-2">Status promo</p>
                </div>
                {/*Order Products*/}
                <AnimatePresence>
                    <div className="relative flex-1 overflow-y-scroll overflow-x-hidden border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line pr-4 max-h-[50vh]">
                        <AnimatePresence>
                            {orderState == 'choose product' &&
                                orders &&
                                Object.entries(orders).map(([key, val]) => (
                                    <OrderCard
                                        key={key}
                                        {...val}
                                        orderId={key}
                                    />
                                ))}
                        </AnimatePresence>
                        {orderState == 'choose payment' && (
                            <Transaction
                                close={() => updateState('choose product')}
                            />
                        )}
                    </div>
                </AnimatePresence>

                <div
                    className={'my-5 text-xs text-white/70 flex flex-col gap-3'}
                >
                    <GridTwoCol left="Diskom" right={props.promo ?? '-'} />
                    <GridTwoCol left="Total Harga" right={props.total} />
                    <GridTwoCol
                        left="Metode Pembayaran"
                        right={props.method ?? '-'}
                    />
                </div>
                {orderState == 'choose product' &&
                Object.keys(orders).length != 0 ? (
                    <Button
                        className="disabled:cursor-not-allowed disabled:bg-primary/10"
                        disabled={Object.keys(orders).length == 0}
                        onClick={() => updateState('choose payment')}
                    >
                        Metode pembayaran
                    </Button>
                ) : (
                    <Button
                        className="disabled:cursor-not-allowed disabled:bg-primary/10"
                        disabled={props.method == null || state == 'create'}
                        onClick={() => setIsDialogPayment(true)}
                    >
                        Buat order
                    </Button>
                )}
            </div>
        </>
    )
}

function Transaction({ close }: { close: () => void }) {
    const { setProps } = useTransactionStore()

    const handleBack = () => {
        setProps('method', null)
        close()
    }

    return (
        <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            className="flex flex-col gap-5 max-h-full"
        >
            <div className="sticky top-0 bg-dark-2 w-full pb-3">
                <button
                    onClick={handleBack}
                    className="border-2 border-primary px-3 py-2 rounded-md w-full"
                    children={'back'}
                />
            </div>
            <div className="grid w-full gap-5 grid-cols-2">
                {paymentMethodExist.map((val, i) => (
                    <TransactionTypeCard key={i} type={val} />
                ))}
            </div>
        </motion.div>
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

type GridTwoColProps = {
    left: string | React.ReactNode
    right: string | React.ReactNode
}
function GridTwoCol(props: GridTwoColProps) {
    return (
        <div className={'flex justify-between'}>
            <p>{props.left}</p>
            <p>{props.right}</p>
        </div>
    )
}
