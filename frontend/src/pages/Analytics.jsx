import React, { useEffect, useState } from 'react'
import Table from '../components/Table'
import clsx from 'clsx'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { useProducts } from '../hooks/useProducts'
import { useAnalytics } from '../hooks/useAnalytics'

export default function Analytics() {
    const [tabActive, setTabActive] = useState('Products')
    const [productParsed, setProductParsed] = useState([])
    const [transactionParsed, setTransactionParsed] = useState([])
    const { products } = useProducts()
    const { getAllTransaction } = useAnalytics()

    useEffect(() => {
        const parsed = products.map((val) => ({
            col1: val._id,
            col2: val.menu,
            col3: val.price,
            col4: {
                edit: () => alert(`Edit ${val._id}`),
            },
        }))
        setProductParsed(parsed)
    }, [products])

    useEffect(async () => {
        await getAllTransaction().then((val) => {
            const parsed =
                val &&
                val.map((val) => ({
                    col1: val._id,
                    col2: val.price,
                }))
            setTransactionParsed(parsed || [])
        })
    }, [])

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
                    <Tabs
                        text={'Promo'}
                        tabActive={tabActive}
                        setTabActive={setTabActive}
                    />
                </div>
                <div
                    className={
                        'border-2 border-white rounded-xl max-h-[70vh] overflow-auto'
                    }
                >
                    {tabActive === 'Products' && (
                        <Table
                            data={productParsed}
                            columns={getProductHeaders(true)}
                        />
                    )}
                    {tabActive === 'Transaction' && (
                        <Table
                            data={transactionParsed}
                            columns={TRANSACTION_HEADERS}
                        />
                    )}
                    {tabActive === 'Promo' && (
                        <Table data={[]} columns={PROMO_HEADERS} />
                    )}
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

function getProductHeaders(isAdmin) {
    return isAdmin
        ? [
              ...PRODUCT_HEADERS,
              {
                  Header: 'Edit',
                  accessor: 'col4',
                  Cell: ({ value }) => (
                      <button onClick={() => value.edit()}>Edit</button>
                  ),
              },
          ]
        : PRODUCT_HEADERS
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

const TRANSACTION_HEADERS = [
    {
        Header: 'ID Transaction',
        accessor: 'col1', // accessor is the "key" in the data
    },
    {
        Header: 'Total price',
        accessor: 'col2',
    },
    {
        Header: 'Total Penjualan',
        accessor: 'col3',
    },
]

const PROMO_HEADERS = [
    {
        Header: 'Promo',
        accessor: 'col1',
    },
]
