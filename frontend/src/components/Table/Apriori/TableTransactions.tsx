import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

type TableTransactionsProps = {
  data: string[][]
}

export function TableTransactions(props: TableTransactionsProps) {
  const { data } = props
  return (
    <DataTable value={data} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20, 50]}>
      <Column header="#" body={(_, opts) => opts.rowIndex + 1} />
      <Column header="Menu" body={(field: typeof data[number]) => field.join(', ')} />
      <Column header="Total Kombinasi" body={(field: typeof data[number]) => field.length} sortable />
    </DataTable>
  )
}
