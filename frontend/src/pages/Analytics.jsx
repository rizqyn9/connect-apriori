import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import clsx from 'clsx'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'

export default function Analytics() {
    const [tabActive, setTabActive] = useState('Products')

    useEffect(() => {}, [tabActive])

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
                    <Table data={dummyData} columns={dummyColumns} />
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

const dummyData = [
    {
        col1: 'Hello',
        col2: 'World',
    },
    {
        col1: 'react-table',
        col2: 'rocks',
    },
    {
        col1: 'whatever',
        col2: 'you want',
    },
]

const dummyColumns = [
    {
        Header: 'Product',
        accessor: 'col1', // accessor is the "key" in the data
    },
    {
        Header: 'Price',
        accessor: 'col2',
    },
    {
        Header: 'Total Penjualan',
        accessor: 'total',
    },
]
