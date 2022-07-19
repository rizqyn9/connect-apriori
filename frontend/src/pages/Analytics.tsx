import React, { useEffect, useState } from 'react'
import Table from '../components/Table1'
import clsx from 'clsx'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { useProductStore } from '../hooks/useProducts'
import { useAnalytics } from '../hooks/useAnalytics'
import { ButtonTab } from '../components/Tabs'
import { Tab } from '@headlessui/react'

export default function Analytics() {
    const [tabActive, setTabActive] = useState('Products')
    const [productParsed, setProductParsed] = useState<object[]>([])
    const [transactionParsed, setTransactionParsed] = useState([])
    const { products } = useProductStore()
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

    useEffect(() => {
        getAllTransaction().then((val) => {
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
            className="px-5 w-full flex-auto overflow-x-scroll text-sm"
            title="Analitycs"
        >
            <div className="py-8 overflow-x-scroll">
                {/*Tabs Container*/}
                <div className={'flex flex-col gap-8 text-white mb-6'}>
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-xl bg-dark-2 p-1 w-full border-2 border-white">
                            <ButtonTab label="Product" />
                            <ButtonTab label="Transaction" />
                            <ButtonTab label="Promo" />
                        </Tab.List>

                        <div className="border-2 border-white rounded-xl max-h-[70vh] overflow-auto">
                            <Tab.Panel>
                                <Table
                                    data={productParsed}
                                    columns={getProductHeaders(true)}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <Table
                                    data={transactionParsed}
                                    columns={TRANSACTION_HEADERS}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <Table data={[]} columns={PROMO_HEADERS} />
                            </Tab.Panel>
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </GridRow>
    )
}

function getProductHeaders(isAdmin: boolean) {
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
