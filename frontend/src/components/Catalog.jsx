import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GetAllProducts } from '../services/product.service'

export default function Catalog() {
    useEffect(async () => {
        await GetAllProducts()
    }, [])

    return (
        <div className="w-full text-white catalog">
            <div className="h-full catalog-main p-5">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold mb-2">Connect Coffee</h1>
                    <p className="text-sm font-thin">
                        {new Date().toDateString()}
                    </p>
                </div>
                <hr className="border-dark-line w-full my-5" />
                <div className="h-[80vh] flex flex-wrap gap-5 align-start justify-start overflow-scroll">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            <div className="flex flex-col h-screen catalog-order bg-dark-2 p-5">
                <User />
                <hr className="border-dark-line w-full my-5" />
                <Order />
            </div>
        </div>
    )
}

function User() {
    return (
        <div className={'flex items-center gap-7'}>
            <div
                className={'h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full'}
            >
                <img src={'./src/static/images/dummy.jpg'} />
            </div>
            <div>
                <h1 className="text-md font-bold">John Doe</h1>
                <p className="text-xs font-thin opacity-70">Admin</p>
            </div>
        </div>
    )
}

function Order() {
    return (
        <div
            className={'w-full h-[80%] flex-grow flex flex-col justify-around'}
        >
            <p className={'text-md font-bold'}>Order #423848234</p>
            {/*Order Products*/}
            <div
                className={
                    'mt-5 max-h-[60%] overflow-scroll border-b-2 border-t-2 py-3 flex flex-col gap-3 border-dark-line'
                }
            >
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
            <div className={'mt-5 text-sm text-white/70'}>
                <div>Discount</div>
                <div>Sub Total</div>
            </div>
            <button
                className={
                    'text-md bg-primary p-2 w-full text-center rounded-lg hover:opacity-80'
                }
            >
                Set payment method
            </button>
        </div>
    )
}

function OrderCard() {
    const [total, setTotal] = useState(0)
    const handle = (isIncrement) => {
        if (isIncrement) setTotal(total + 1)
        else {
            if (total === 0) return
            setTotal(total - 1)
        }
    }

    return (
        <div className="bg-dark-1 p-2 rounded-md flex gap-5">
            {/*Product Image*/}
            <div className="w-20 h-20 overflow-hidden">
                <img
                    src="/src/static/images/dummy.jpg"
                    className="mt-[-2.5rem]"
                />
            </div>
            <div>
                <h2 className="font-bold text-sm">Product Name</h2>
                <h2 className="text-xs">Rp. 141432</h2>
            </div>
            {/*Increment Decrement*/}
            <div className={'h-6 flex overflow-hidden rounded-md'}>
                <button
                    onClick={() => handle(false)}
                    className={
                        'bg-primary flex items-center justify-center p-2 h-full'
                    }
                >
                    -
                </button>
                <p
                    className={
                        'bg-dark-2 text-white flex items-center justify-center p-2 h-full text-xs'
                    }
                >
                    {total}
                </p>
                <button
                    onClick={() => handle(true)}
                    className={
                        'bg-primary flex items-center justify-center p-2 h-full'
                    }
                >
                    +
                </button>
            </div>
            {/*<button className="w-3 h-3">*/}
            {/*    <Icon.Delete />*/}
            {/*</button>*/}
        </div>
    )
}
