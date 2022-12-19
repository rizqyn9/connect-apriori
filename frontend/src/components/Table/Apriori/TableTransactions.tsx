import { TD, TH, TR } from '..'

type TableTransactionsProps = {
  data: string[][]
}

export function TableTransactions(props: TableTransactionsProps) {
  return (
    <div className="w-full overflow-x-auto border md:border-4 rounded-xl border-white">
      <table className="w-max min-w-full bg-dark-2 rounded-lg">
        <thead>
          <tr className="bg-primary">
            <TH>No</TH>
            <TH>Menu</TH>
          </tr>
        </thead>
        <tbody className="border-2 border-white">
          {props.data.map((menu, i) => (
            <TR key={i}>
              <TD className="text-center">{i + 1}</TD>
              <TD>{Array.isArray(menu) ? menu.join(', ') : JSON.stringify(menu)}</TD>
            </TR>
          ))}
        </tbody>
      </table>
    </div>
  )
}
