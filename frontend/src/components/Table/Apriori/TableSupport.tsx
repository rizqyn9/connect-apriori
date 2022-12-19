import { TD, TH, TR } from '..'

type TableSupportProps = {
  data: {
    menu: string[]
    support: number
  }[]
}

export function TableSupport(props: TableSupportProps) {
  return (
    <div className="w-full overflow-x-auto border md:border-4 rounded-xl border-white">
      <table className="w-max min-w-full bg-dark-2 rounded-lg">
        <thead>
          <tr className="bg-primary">
            <TH>No</TH>
            <TH>Menu</TH>
            <TH>Support</TH>
          </tr>
        </thead>
        <tbody className="border-2 border-white">
          {props.data.map((data, i) => (
            <TR key={i}>
              <TD className="text-center">{i + 1}</TD>
              <TD>{data.menu.join(' ')}</TD>
              <TD>{data.support}</TD>
            </TR>
          ))}
        </tbody>
      </table>
    </div>
  )
}
