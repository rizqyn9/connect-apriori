import { Button } from '../components/Button'
import { GridRow } from '../components/Grid'
import { TD, TH, TR } from '../components/Table'
import { H1 } from '../components/Typography'
import { useState } from 'react'

export default function Apriori() {
    const [apriori, setApriori] = useState([])
    return (
        <GridRow className="px-5 w-full flex-auto overflow-x-scroll text-sm" title="Analitycs">
            <div className="py-8 overflow-x-scroll">
                <H1>Get Promo Recomendation</H1>
                <div className="bg-pimary flex flex-col gap-5">
                    <p>Result</p>
                    <div className="overflow-hidden rounded-md border-2 border-white">
                        <table className="w-full bg-dark-2 rounded-lg">
                            <thead>
                                <tr className="bg-primary">
                                    <TH>Menu</TH>
                                    <TH>Order History</TH>
                                </tr>
                            </thead>
                            <tbody className="border-2 border-white">
                                {apriori.length == 0 ? (
                                    <TR className="text-center">
                                        <TD className="py-8" colSpan={4}>
                                            Data Not found
                                        </TD>
                                    </TR>
                                ) : (
                                    apriori.map((val, i) => (
                                        <TR key={i}>
                                            <TD className="p-2 text-center" width={100}>
                                                {i + 1}
                                            </TD>
                                            <TD className="flex gap-5">
                                                <Button className="w-1/3">Remove</Button>
                                            </TD>
                                        </TR>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Button>Generate</Button>
                </div>
                <div className="flex flex-col gap-8 text-white mb-6"></div>
            </div>
        </GridRow>
    )
}
