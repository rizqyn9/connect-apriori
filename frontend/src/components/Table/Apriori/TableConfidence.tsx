import { TD, TH, TR } from '..'
import { ResponseApriori } from '../../../pages/Apriori'

type TableConfidenceProps = {
    data: ResponseApriori['payload']['confidence']
}
export function TableConfidence(props: TableConfidenceProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>No</TH>
                    <TH>X</TH>
                    <TH>Y</TH>
                    <TH>Support</TH>
                    <TH>Confidence</TH>
                </tr>
            </thead>
            <tbody className="border-2 border-white">
                {props.data.map((data, i) => (
                    <TR key={i}>
                        <TD>{i + 1}</TD>
                        <TD>{data.X.join(' ')}</TD>
                        <TD>{data.Y.join(' ')}</TD>
                        <TD>{data.Support}</TD>
                        <TD>{data.Confidence}</TD>
                    </TR>
                ))}
            </tbody>
        </table>
    )
}
