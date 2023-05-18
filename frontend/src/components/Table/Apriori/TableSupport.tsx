import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

import { TD, TH, TR } from '..'

type TableSupportProps = {
  data: {
    menu: string[]
    support: number
  }[]
}

export function TableSupport(props: TableSupportProps) {
  const { data } = props
  return (
    <DataTable value={data} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20, 50]}>
      <Column header="#" body={(_, opts) => opts.rowIndex + 1} />
      <Column header="Menu" body={(field: typeof data[number]) => field.menu.join(', ')} />
      <Column header="Support" field="support" sortable />
    </DataTable>
  )
}
