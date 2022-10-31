import { GridRow } from '../components/Grid'
import { ButtonTab, Tab } from '../components/Tabs'
import { useToastStore } from '../components/Toast'
import { TableAnalyticPromo } from '../components/Table'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { anaylyticService, transactionService } from '@/services'
import Table, { TD } from '@/components/Table/Table'
import { useMemo, useState } from 'react'
import { DialogContainer } from '@/components/Dialog/DialogContainer'
import { Dialog } from '@headlessui/react'
import { H1 } from '@/components/Typography'
import { Button } from '@/components/Button'

export default function Analytics() {
    const { addToast } = useToastStore()

    const analytics = useQuery(['analytics'], anaylyticService.getAnalyticsData, {
        onSuccess: () => addToast({ msg: 'Success update analytics' }),
        onError: () => addToast({ msg: 'Server error' }),
        refetchOnMount: false,
    })

    return (
        <GridRow className="px-5 w-full flex-auto overflow-x-scroll text-sm" title="Analitycs">
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
                            {analytics.isSuccess && (
                                <>
                                    <Tab.Panel>
                                        <Products data={analytics.data?.payload?.products ?? []} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <Transactions data={analytics.data?.payload?.transactions ?? []} />
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <TableAnalyticPromo data={analytics.data?.payload?.promos ?? []} />
                                    </Tab.Panel>
                                </>
                            )}
                        </div>
                    </Tab.Group>
                </div>
            </div>
        </GridRow>
    )
}

const toCurrency = new Intl.NumberFormat('id-ID')

type ProductsProps = {
    _id: string
    menu: string
    totalOrdered: number
    price: number
}
function Products({ data }: { data: ProductsProps[] }) {
    const dataContent = useMemo(() => {
        return data.map((x, i) => (
            <>
                <TD center>{i + 1}</TD>
                <TD>{x.menu}</TD>
                <TD center>{toCurrency.format(x.price)}</TD>
                <TD center>{x.totalOrdered}</TD>
                <TD center>{x._id}</TD>
            </>
        ))
    }, [data])
    return <Table headers={['No', 'Menu', 'Price', 'Order', 'ID']} data={dataContent} />
}

type TransactionProps = {
    _id: string
    price: number
    customerId?: string
    promo: null
    createdAt: string
}

function Transactions({ data }: { data: TransactionProps[] }) {
    const [state, setState] = useState<string | null>(null)

    const dataContent = useMemo(() => {
        return data.map((x, i) => (
            <>
                <TD center>{i + 1}</TD>
                <TD>{x._id}</TD>
                <TD center>{x.price}</TD>
                <TD center>{new Date(x.createdAt).toLocaleString()}</TD>
                <TD center>
                    <Button onClick={() => setState(x._id)}>Delete</Button>
                </TD>
            </>
        ))
    }, [data])
    return (
        <>
            <DialogDelete id={state} close={() => setState(null)} />
            <Table headers={['No', 'ID', 'Price', 'Created at', 'Action']} data={dataContent} />
        </>
    )
}

function DialogDelete({ id, close }: { id: string | null; close: () => void }) {
    const { addToast } = useToastStore()
    const queryClient = useQueryClient()
    const mutation = useMutation(transactionService.deleteTransaction, {
        onSuccess: () => {
            close()
            addToast({ msg: 'Success delete transaction' })
            queryClient.invalidateQueries(['analytics'])
        },
    })
    return (
        <DialogContainer isOpen={typeof id === 'string'} setIsOpen={close}>
            <Dialog.Panel className="bg-dark-2 border border-white p-5 text-white rounded-lg w-[50vw] h-max flex flex-col">
                <H1>Delete transaction</H1>
                <div className="w-full h-full flex flex-col gap-5 items-center text-center">
                    <div className="flex gap-5">
                        <Button className="w-24 bg-transparent border border-primary" onClick={close}>
                            No
                        </Button>
                        <Button className="w-24 bg-red-600" onClick={() => mutation.mutate(id!)}>
                            Yes
                        </Button>
                    </div>
                </div>
            </Dialog.Panel>
        </DialogContainer>
    )
}
