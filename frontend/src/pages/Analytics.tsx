import { GridRow } from '../components/Grid'
import { Tab } from '../components/Tabs'
import { useToastStore } from '../components/Toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GetAnalyticsData, anaylyticService, transactionService } from '@/services'
import { DialogContainer } from '@/components/Dialog/DialogContainer'
import { Dialog } from '@headlessui/react'
import { H1 } from '@/components/Typography'
import { Button } from '@/components/Button'
import { DataTable, DataTableExpandedRows, DataTableValueArray } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { toIDR } from '@/utils/base64'
import { useState } from 'react'

export default function Analytics() {
  const { addToast } = useToastStore()

  const analytics = useQuery(['analytics'], anaylyticService.getAnalyticsData, {
    onSuccess: () => addToast({ msg: 'Success update analytics' }),
    onError: () => addToast({ msg: 'Server error' }),
    refetchOnMount: true,
  })

  return (
    <GridRow className="px-5 w-full flex-auto overflow-x-scroll text-sm" title="Analitycs">
      <div className="py-8 overflow-x-scroll">
        <div className={'flex flex-col gap-8 text-white mb-6'}>
          <Tab.Group>{analytics.isSuccess && analytics.data && <Transactions data={analytics.data?.transactions} />}</Tab.Group>
        </div>
      </div>
    </GridRow>
  )
}

const date = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeZone: 'Asia/Jakarta' })

function Transactions({ data }: { data: GetAnalyticsData['transactions'] }) {
  const [expandedRows, setExpandedRows] = useState<DataTableValueArray | DataTableExpandedRows | undefined>(undefined)

  const rowExpansionTemplate = (trx: typeof data[number]) => {
    return (
      <div className="p-3">
        <h5>Detail transaksi #_{trx._id}</h5>
        <DataTable value={trx.orders}>
          <Column field="menu" header="Menu" sortable></Column>
          <Column field="quantity" header="Total" sortable></Column>
          <Column field="price" header="Harga Satuan" sortable></Column>
          <Column field="priceAmount" header="Total Harga" sortable></Column>
        </DataTable>
      </div>
    )
  }

  return (
    <>
      <DataTable
        rowExpansionTemplate={rowExpansionTemplate}
        value={data}
        paginator={true}
        rows={20}
        rowsPerPageOptions={[5, 10, 20, 50]}
        dataKey="_id"
        expandedRows={expandedRows}
        onRowToggle={(e) => setExpandedRows(e.data)}
      >
        <Column expander style={{ width: '5rem' }} />
        <Column header="#" body={(_, props) => props.rowIndex + 1} />
        <Column field="_id" header="ID Transaksi" />
        <Column field="price" header="Total Pembayaran" sortable body={(field: typeof data[number]) => toIDR(field.price)} align="center" />
        <Column
          field="paymentMethod"
          header="Metode Pembayaran"
          sortable
          body={(field: typeof data[number]) => <p className="capitalize">{field.paymentMethod}</p>}
          align="center"
        />
        <Column
          field="createdAt"
          header="Tgl Pembelian"
          body={(field: typeof data[number]) => date.format(new Date(field.createdAt))}
          sortable
          align="right"
        />
      </DataTable>
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
