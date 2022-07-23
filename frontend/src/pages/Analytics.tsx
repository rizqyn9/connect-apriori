import React from 'react'
import { GridRow } from '../components/Grid'
import { useAnalyticsStore, AnalyticsDataProps } from '../hooks/useAnalytics'
import { ButtonTab, Tab } from '../components/Tabs'
import { useToastStore } from '../components/Toast'
import { useOnce } from '../hooks/useOnce'
import {
    TableAnalyticProduct,
    TableAnalyticPromo,
    TableAnalyticTransaction,
} from '../components/Table'

export default function Analytics() {
    const { getAllAnalytics } = useAnalyticsStore()
    const { addToast } = useToastStore()
    const [state, setState] = React.useState<AnalyticsDataProps>({
        transactions: [],
        promos: [],
        products: [],
    })

    useOnce(() => {
        fetchAnalytics()
    }, [])

    async function fetchAnalytics() {
        getAllAnalytics()
            .then((res) => {
                setState(res)
                addToast({ msg: 'Success update analytics' })
            })
            .catch((err) => console.log({ err }))
    }

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
                                <TableAnalyticProduct data={state.products} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <TableAnalyticTransaction
                                    data={state.transactions}
                                />
                            </Tab.Panel>
                            <Tab.Panel>
                                <TableAnalyticPromo data={state.promos} />
                            </Tab.Panel>
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </GridRow>
    )
}
