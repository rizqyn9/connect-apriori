import { TD, TH, TR } from '.'
import { Button } from '../Button'

type TableAnalyticPoductsProps = {
    data: ProductProps[]
}

export default function TableAnalyticProduct(props: TableAnalyticPoductsProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>No</TH>
                    <TH>Menu</TH>
                    <TH>Price</TH>
                    <TH>Action</TH>
                </tr>
            </thead>
            <tbody className="border-2 border-white">
                {props.data.map((val, i) => (
                    <TR>
                        <TD className="p-2 text-center" width={100}>
                            {i + 1}
                        </TD>
                        <TD>{val.menu}</TD>
                        <TD>{val.price}</TD>
                        <TD className="flex gap-5">
                            <Button className="w-1/3">Edit</Button>
                            <Button className="w-1/3">Remove</Button>
                        </TD>
                    </TR>
                ))}
            </tbody>
        </table>
    )
}
