import React, { useEffect, useState } from 'react'
import Card from './Card'
import Order from './Order'
import { GridRow, GridRowMotion } from './Grid'
import { useAuth } from '../hooks/useAuth'
import { useProductStore } from '../hooks/useProducts'
import { useToastStore } from './Toast'
import { Button } from './Button'
import { motion } from 'framer-motion'
import { useOnce } from '../hooks/useOnce'

export default function Catalog() {
    const { addToast } = useToastStore()
    const { getAllProducts, products } = useProductStore()

    const [activeCard, setActiveCard] = useState('')
    const [showCart, setShowCart] = useState()

    useOnce(() => {
        if (products.length == 0) fetchProduct()
    }, [])

    const fetchProduct = React.useCallback(() => {
        getAllProducts()
            .then(() => addToast({ msg: 'update catalog' }))
            .catch((err: any) => addToast({ msg: err, type: 'error' }))
    }, [])

    return (
        <>
            <GridRow
                className={'px-4 w-full text-sm'}
                title={
                    <div className="text-white flex flex-col justify-center h-full w-full">
                        <h1 className="text-lg font-bold mb-2">
                            Connect Coffee
                        </h1>
                        <p className="text-xs font-thin">
                            {new Date().toLocaleDateString('id')}
                        </p>
                    </div>
                }
            >
                <div className="row-start-2 flex h-full py-8 flex-col gap-5">
                    <div className="self-start">
                        <Button onClick={fetchProduct}>Refresh</Button>
                    </div>
                    <div className="flex-auto flex flex-wrap gap-2 align-start justify-start overflow-y-scroll h-full max-h-[75vh] p-1">
                        {Array.isArray(products) &&
                            products.map((val, i) => (
                                <Card
                                    activeCard={activeCard == val._id}
                                    setActiveCard={setActiveCard}
                                    key={i}
                                    _id={val._id}
                                    price={val.price}
                                    menu={val.menu}
                                    imageURL={val.imageURL}
                                />
                            ))}
                    </div>
                </div>
            </GridRow>
            <GridRow
                title={<UserMemo />}
                className="bg-dark-2 overflow-y-auto max-h-screen-auto px-3 max-w-[24rem] hidden md:block"
            >
                <Order className="h-full row-start-2 py-8" />
            </GridRow>
        </>
    )
}

const UserMemo = React.memo(User)

function User() {
    const { signOut, authUser } = useAuth()

    return (
        <div className="h-full w-full flex items-center gap-6 text-sm">
            <div className="h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full">
                <img src={'./src/static/images/dummy.jpg'} alt={''} />
            </div>
            <div className={'flex flex-1 flex-col gap-2'}>
                <h1 className="text-md font-bold">{authUser?.name}</h1>
                <p className="text-xs font-thin opacity-70">{authUser?.role}</p>
            </div>
            {/* Sign Out */}
            <Button className="justify-self-end py-1">Sign Out</Button>
        </div>
    )
}
