import React from 'react'
import { GridRow } from '../components/Grid'
import { useAnalyticsStore, AnalyticsDataProps } from '../hooks/useAnalytics'
import { ButtonTab } from '../components/Tabs'
import { Tab } from '@headlessui/react'
import TableAnalyticProduct from '../components/Table/TableAnalyticProduct'
import TableAnalyticTransaction from '../components/Table/TableAnalyticTransaction'
import TableAnalyticPromo from '../components/Table/TableAnalyticPromo'
import { useToastStore } from '../components/Toast'
import { useOnce } from '../hooks/useOnce'

export default function Analytics() {
    const shouldFetch = React.useRef(false)
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
                                <TableAnalyticProduct data={[]} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <TableAnalyticTransaction data={[]} />
                            </Tab.Panel>
                            <Tab.Panel>
                                <TableAnalyticPromo data={[]} />
                            </Tab.Panel>
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </GridRow>
    )
}
