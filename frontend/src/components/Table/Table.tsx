import { TD, TH, TR } from '.'

type ElFunc = () => JSX.Element

type TableProps = {
    headers: string[]
    data: (JSX.Element | ElFunc)[]
}

function BaseTable({ headers, data }: TableProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    {headers.map((x) => (
                        <TH key={x}>{x}</TH>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <TR className="text-center">
                        <TD className="py-8" colSpan={headers.length}>
                            Data Empty
                        </TD>
                    </TR>
                ) : (
                    data.map((x, i) => <TR key={i}>{typeof x === 'function' ? x() : x}</TR>)
                )}
            </tbody>
        </table>
    )
}

export { BaseTable as default, TD }
