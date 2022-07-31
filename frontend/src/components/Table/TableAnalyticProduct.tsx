import { TD, TH, TR } from '.'
import { Button } from '../Button'

type TableAnalyticPoductsProps = {
    data: {
        _id: string
        menu: string
        totalOrdered: number
        price: number
    }[]
}

export function TableAnalyticProduct(props: TableAnalyticPoductsProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>No</TH>
                    <TH>Menu</TH>
                    <TH>Price</TH>
                    <TH>Order</TH>
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
                        <TR key={i}>
                            <TD className="p-2 text-center" width={100}>
                                {i + 1}
                            </TD>
                            <TD>{val.menu}</TD>
                            <TD className="text-center">{val.price}</TD>
                            <TD className="text-center">{val.totalOrdered ?? 0}</TD>
                            <TD className="flex gap-5 justify-center">
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
