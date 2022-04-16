import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import clsx from 'clsx'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { useProducts } from '../hooks/useProducts'

export default function Analytics() {
    const [tabActive, setTabActive] = useState('Products')
    const [productParsed, setProductParsed] = useState([])
    const { products } = useProducts()

    useEffect(() => {
        let test = []
        for (const key in products) {
            let product = products[key]
            test.push({
                col1: product._id,
                col2: product.menu,
                col3: product.price,
            })
        }
        setProductParsed(test)
    }, [products])

    return (
        <GridRow
            className={'px-5 w-full flex-auto'}
            title={
                <div className="flex flex-col justify-center h-full w-full">
                    <H1>Analitycs</H1>
                </div>
            }
        >
            <div className={'py-8'}>
                {/*Tabs Container*/}
                <div className={'flex gap-3 text-white mb-6'}>
                    <Tabs
                        text={'Products'}
                        tabActive={tabActive}
                        setTabActive={setTabActive}
                    />
                    <Tabs
                        text={'Transaction'}
                        tabActive={tabActive}
                        setTabActive={setTabActive}
                    />
                </div>
                <div
                    className={
                        'border-2 border-white overflow-hidden rounded-xl'
                    }
                >
                    <Table data={productParsed} columns={PRODUCT_HEADERS} />
                </div>
            </div>
        </GridRow>
    )
}

function Tabs({ text, tabActive, setTabActive }) {
    return (
        <button
            className={clsx(
                'rounded-md py-1 px-3 border-b-2  hover:bg-dark-2/50 transition',
                `${
                    tabActive === text
                        ? 'bg-primary pointer-events-none border-white nav__active'
                        : ''
                }`
            )}
            onClick={() => setTabActive(text)}
        >
            <p>{text}</p>
        </button>
    )
}

const PRODUCT_HEADERS = [
    {
        Header: 'ID',
        accessor: 'col1', // accessor is the "key" in the data
    },
    {
        Header: 'Product',
        accessor: 'col2',
    },
    {
        Header: 'Total Penjualan',
        accessor: 'col3',
    },
]
