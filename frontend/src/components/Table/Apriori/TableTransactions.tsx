import { TD, TH, TR } from '..'
import Table from '../../Table1'

type TableTransactionsProps = {
    data: string[][]
}

export function TableTransactions(props: TableTransactionsProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>No</TH>
                    <TH>Menu</TH>
                </tr>
            </thead>
            <tbody className="border-2 border-white">
                {props.data.map((menu, i) => (
                    <TR key={i}>
                        <TD>{i + 1}</TD>
                        <TD>{menu.join(' ')}</TD>
                    </TR>
                ))}
            </tbody>
        </table>
    )
}
