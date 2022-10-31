import { motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { useOrderStore } from '../hooks/useOrder'
import { OrderProps } from '../types'
import Icon from './Icon'

/**
 * Untuk menampilkan barang yang diorder
 */

function OrderCard(props: OrderProps) {
    const { orderId, _id, menu, imageURL, price, menuType, quantity } = props
    const { removeOrder, setNotes, updateQuantity } = useOrderStore()

    return (
        <motion.div
            initial={{ x: 100, scale: 0.8 }}
            animate={{ x: 0, scale: 1 }}
            exit={{ x: -200, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-dark-1 p-2 rounded-md flex flex-col gap-2"
        >
            {/*Image & Menu Details*/}
            <div className={'grid grid-cols-3'}>
                {/*Product Image*/}
                <div className="w-[5rem] h-[5rem] rounded-lg border-2 border-primary/70 overflow-hidden col-span-1">
                    <img src={imageURL} className="h-full" alt="" />
                </div>
                <div className="flex flex-col justify-between">
                    {/*Menu & Type*/}
                    <div className={'flex gap-2 align-center'}>
                        <div className="w-5 h-5 flex items-center justify-center">{menuType === 'hot' ? <Icon.Hot /> : <Icon.Ice />}</div>
                        <h2 className="font-bold text-sm whitespace-nowrap">{menu}</h2>
                    </div>
                    <h2 className="text-xs">Rp. {price * quantity}</h2>
                    <IncrDcr quantity={quantity} decrement={() => updateQuantity(orderId, -1)} increment={() => updateQuantity(orderId, 1)} />
                </div>
            </div>
            <div className="flex gap-3">
                <input
                    className="flex-auto h-8 bg-dark-2 p-2 rounded-md border-2 border-dark-line text-white text-sm"
                    placeholder="Notes"
                    onChange={(e) => setNotes(orderId, e.target.value)}
                />
                <button
                    className="h-8 w-8 p-1 border-2 border-primary rounded-md text-primary hover:text-primary/50 hover:border-primary/50"
                    onClick={() => removeOrder(orderId)}
                >
                    <Icon.Delete />
                </button>
            </div>
        </motion.div>
    )
}

type IncrDcrProps = {
    quantity: number
    increment: () => void
    decrement: () => void
}

function IncrDcr({ quantity, increment, decrement }: IncrDcrProps) {
    const className = useMemo(() => 'bg-primary flex-1 h-full grid place-content-center hover:bg-primary/50', [])
    return (
        <div className="h-6 w-[5rem] flex overflow-hidden rounded-md">
            <button onClick={decrement} className={className} children="-" />
            <p className="bg-dark-2 h-full text-[.7rem] min-w-[1.7rem] grid place-content-center">{quantity}</p>
            <button onClick={increment} className={className} children="+" />
        </div>
    )
}

const OrderCardMemo = React.memo(OrderCard)
export { OrderCardMemo, OrderCard }
