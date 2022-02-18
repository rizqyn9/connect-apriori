import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GetAllProducts } from '../services/product.service'
import Order from './Order'

export default function Catalog() {
    const [products, setProducts] = useState([])
    const [activeCard, setActiveCard] = useState('')

    useEffect(async () => {
        let result = await GetAllProducts()
        // console.log(result)
        if (result.data && result.data.length !== 0) setProducts(result.data)
    }, [])

    return (
        <div className="h-full w-full text-white grid grid-cols-8">
            <div className="p-5 col-start-1 col-span-5 flex flex-col">
                <div className="h-[6rem] border-b-2 border-dark-line">
                    <h1 className="text-2xl font-bold mb-2">Connect Coffee</h1>
                    <p className="text-sm font-thin">
                        {new Date().toLocaleDateString('id')}
                    </p>
                </div>
                <div className="flex-auto flex flex-wrap gap-5 align-start justify-start overflow-y-scroll py-7">
                    {products.map((val, i) => (
                        <Card
                            activeCard={activeCard == val._id}
                            setActiveCard={setActiveCard}
                            key={i}
                            id={val._id}
                            price={val.price}
                            menu={val.menu}
                            image={val.image.data}
                        />
                    ))}
                </div>
            </div>
            <div className="col-span-3 col-start-6 bg-dark-2 p-6">
                <User />
                <Order />
            </div>
        </div>
    )
}

function User() {
    return (
        <div
            className={
                'h-[5rem] flex items-center gap-7 border-b-2 border-dark-line'
            }
        >
            <div
                className={'h-[3.5rem] w-[3.5rem] overflow-hidden rounded-full'}
            >
                <img src={'./src/static/images/dummy.jpg'} alt={''} />
            </div>
            <div className={'flex flex-col gap-2'}>
                <h1 className="text-md font-bold">John Doe</h1>
                <p className="text-xs font-thin opacity-70">Admin</p>
            </div>
        </div>
    )
}
