import { TD, TH, TR } from '.'

type TablePaymentOrderProps = {
    orders: OrderProps[]
}
export function TablePaymentOrder({ orders }: TablePaymentOrderProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>Variant</TH>
                    <TH>Menu</TH>
                    <TH>Quantity</TH>
                    <TH>Total</TH>
                </tr>
            </thead>
            <tbody className="border-2 border-white">
                {orders.map((val, i) => (
                    <TR>
                        <TD className="p-2 text-center">{val.menuType}</TD>
                        <TD>{val.menu}</TD>
                        <TD className="text-center">{val.quantity}</TD>
                        <TD className="text-right">
                            {val.price * val.quantity}
                        </TD>
                    </TR>
                ))}
            </tbody>
        </table>
    )
}
