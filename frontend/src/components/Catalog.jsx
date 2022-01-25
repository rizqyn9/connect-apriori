import React, { useState } from 'react'
import Card from './Card'
import Icon from './Icon'

export default function Catalog() {
    return (
        <div className="w-full text-white catalog">
            <div className="catalog-main p-5">
                <div className="mb-5">
                    <h1 className="text-2xl font-bold mb-2">Connect Coffee</h1>
                    <p className="text-sm font-thin">
                        {new Date().toDateString()}
                    </p>
                </div>
                <hr className="bg-dark-line w-full my-5" />
                <div className="flex flex-wrap gap-5">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
            <div className="flex flex-col flex-wrap gap-5 catalog-order bg-dark-2 p-5">
                {/*<Card />*/}
                {/*<User />*/}
                {/*<Order />*/}
            </div>
        </div>
    )
}

function User() {
    return (
        <div>
            <h1 className="text-xl font-bold">John Doe</h1>
            <p className="text-md font-thin">Admin</p>
        </div>
    )
}

function Order() {
    return (
        <div>
            <p>Order Id</p>
            {/*Order Products*/}
            <div>{/*<OrderCard />*/}</div>
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
                <h2 className="font-bold">Product Name</h2>
                <h2 className="font-bold">x 12</h2>
                <h2 className="font-bold">Rp. 141432</h2>
            </div>
            {/*Increment Decrement*/}
            <div>
                <button onClick={() => handle(false)}>-</button>
                <input type="number" value={total} />
                <button onClick={() => handle(true)}>+</button>
            </div>
            <button className="w-3 h-3">
                <Icon.Delete />
            </button>
        </div>
    )
}
