import { Button } from '../components/Button'
import { GridRow } from '../components/Grid'
import { TD, TH, TR } from '../components/Table'
import { useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { axiosPrivate } from '../services'
import React from 'react'

type ResponseApriori = {
    payload: {
        itemsets:
            | {
                  support: number
                  items: string[]
              }[]
            | null
    }
}

export default function Apriori() {
    const [promoState, setPromoState] = React.useState<NewPromo>({ isActive: false, price: 0, menuId: null })
    const [apriori, setApriori] = useState<NonNullable<ResponseApriori['payload']['itemsets']>>([])
    const handleGenerate = () => {
        axiosPrivate.get<ResponseApriori>('/apriori').then((val) => {
            let data = val.data.payload
            if (data && typeof data == 'object' && data.itemsets) {
                console.log(val)
                setApriori(data.itemsets)
            }
        })
    }

    const handleOpenNewPromo = () => setPromoState({ ...promoState, isActive: true })

    return (
        <GridRow className="px-5 w-full flex-auto overflow-x-scroll text-sm" title="Analitycs">
            <div className="py-8 overflow-x-scroll">
                <div className="mb-5">
                    {promoState.isActive ? (
                        <AddNewPromoCard promoState={promoState} setPromoState={setPromoState} />
                    ) : (
                        <Button onClick={handleOpenNewPromo}>Add new promo</Button>
                    )}
                </div>
                <h3 className="text-lg font-bold mb-3">Get Promo Recomendation</h3>
                <div className="bg-pimary flex flex-col gap-5">
                    <div className="overflow-hidden rounded-md border-2 border-white">
                        <table className="w-full bg-dark-2 rounded-lg">
                            <thead>
                                <tr className="bg-primary">
                                    <TH>No</TH>
                                    <TH>Menu</TH>
                                    <TH>Support</TH>
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
                                            <TD className="p-2 text-center" width={50}>
                                                {i + 1}
                                            </TD>
                                            <TD className="p-2 text-center" width={400}>
                                                <div className="flex gap-4">
                                                    {val.items.map((val) => (
                                                        <span key={val}>{val}</span>
                                                    ))}
                                                </div>
                                            </TD>
                                            <TD className="">
                                                {val.support}
                                                {/* <Button className="" size="sm">
                                                    Remove
                                                </Button> */}
                                            </TD>
                                        </TR>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Button onClick={handleGenerate}>Generate</Button>
                </div>
                <div className="flex flex-col gap-8 text-white mb-6"></div>
            </div>
        </GridRow>
    )
}

type NewPromo = {
    isActive: boolean
    price: number
    menuId: string | null
}
type NewPromoCardProps = {
    promoState: NewPromo
    setPromoState: (data: NewPromo) => void
}
function AddNewPromoCard(props: NewPromoCardProps) {
    const { promoState, setPromoState } = props
    return (
        <div className="flex gap-4 flex-col mb-5 p-5">
            Add New Promo
            <input className="bg-dark-2 p-3 rounded-xl" placeholder="Harga" />
            <div className="flex gap-4">
                <Button size="sm" onClick={() => setPromoState({ ...promoState, isActive: false })}>
                    Cancel
                </Button>
                <Button size="sm" onClick={() => setPromoState({ ...promoState, isActive: false })}>
                    Tambah
                </Button>
            </div>
        </div>
    )
}
