import { TD, TH, TR } from '.'
import { Button } from '../Button'

type TableAnalyticTransactionProps = {
    data: TransactionProps[]
}
export function TableAnalyticTransaction(props: TableAnalyticTransactionProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>No</TH>
                    <TH>ID Transaction</TH>
                    <TH>Price</TH>
                    <TH>Action</TH>
                </tr>
            </thead>
            <tbody className="border-2 border-white">
                {props.data.length == 0 ? (
                    <TR className="text-center">
                        <TD className="py-8" colSpan={4}>
                            Data Not found
                        </TD>
                    </TR>
                ) : (
                    props.data.map((val, i) => (
                        <TR>
                            <TD className="p-2 text-center" width={100}>
                                {i + 1}
                            </TD>
                            <TD>{val.promo}</TD>
                            <TD>{val.method}</TD>
                            <TD className="flex gap-5">
                                <Button className="w-1/3">Edit</Button>
                                <Button className="w-1/3">Remove</Button>
                            </TD>
                        </TR>
                    ))
                )}
            </tbody>
        </table>
    )
}
