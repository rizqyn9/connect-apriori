import React, { useEffect, useState } from 'react'
import Card from './Card'
import { GetAllProducts } from '../services/product.service'
import Order from './Order'
import { useAtom } from 'jotai'

export default function Catalog() {
    const [products, setProducts] = useState([])

    useEffect(async () => {
        let result = await GetAllProducts()
        console.log(result)
        if (result.data && result.data.length !== 0) setProducts(result.data)
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
                    {products.map((val, i) => (
                        <Card
                            key={i}
                            id={val._id}
                            price={val.price}
                            menu={val.menu}
                            image={val.image.data}
                            // handleAddToCart={handleAddCart}
                        />
                    ))}
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
                <img src={'./src/static/images/dummy.jpg'} alt={''} />
            </div>
            <div>
                <h1 className="text-md font-bold">John Doe</h1>
                <p className="text-xs font-thin opacity-70">Admin</p>
            </div>
        </div>
    )
}
