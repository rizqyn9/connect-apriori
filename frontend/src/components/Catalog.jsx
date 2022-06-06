import React, { useEffect, useState } from 'react'
import Card from './Card'
import Order from './Order'
import { GridRow } from './Grid'
import { useAuth } from '../hooks/useAuth'
import { useProducts } from '../hooks/useProducts'

export default function Catalog() {
    const { getAllProducts, products } = useProducts()
    const [activeCard, setActiveCard] = useState('')

    useEffect(async () => {
        if (products.length == 0) await getAllProducts()
    }, [])

    return (
        <>
            <GridRow
                className={'px-5 w-full'}
                title={
                    <div className="text-white flex flex-col justify-center h-full w-full">
                        <h1 className="text-2xl font-bold mb-2">
                            Connect Coffee
                        </h1>
                        <p className="text-sm font-thin">
                            {new Date().toLocaleDateString('id')}
                        </p>
                    </div>
                }
            >
                <div className="row-start-2 flex h-full py-8 flex-col gap-5">
                    <div className=" self-start">
                        <button className="p-2 bg-primary rounded-md">
                            Refresh
                        </button>
                    </div>
                    <div className="flex-auto flex flex-wrap gap-5 align-start justify-start overflow-y-scroll h-full max-h-[75vh] p-2">
                        {Array.isArray(products) &&
                            products.map((val, i) => (
                                <Card
                                    activeCard={activeCard == val._id}
                                    setActiveCard={setActiveCard}
                                    key={i}
                                    id={val._id}
                                    price={val.price}
                                    menu={val.menu}
                                    image={val.image}
                                />
                            ))}
                    </div>
                </div>
            </GridRow>
            <GridRow title={<UserMemo />} className="w-[40rem] px-5 bg-dark-2">
                <Order className={'h-full row-start-2 py-8'} />
            </GridRow>
        </>
    )
}

const UserMemo = React.memo(User)

function User() {
    const { signOut, authUser } = useAuth()

    return (
        <div className={'h-full flex items-center gap-6 '}>
            <div
                className={'h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full'}
            >
                <img src={'./src/static/images/dummy.jpg'} alt={''} />
            </div>
            <div className={'flex flex-col gap-2'}>
                <h1 className="text-md font-bold">{authUser.name}</h1>
                <p className="text-xs font-thin opacity-70">{authUser.role}</p>
            </div>
            {/* Sign Out */}
            <div className="flex-1 text-right" onClick={signOut}>
                <span className="bg-primary p-2 rounded-lg cursor-pointer">
                    Sign Out
                </span>
            </div>
        </div>
    )
}
