import { Button } from '../components/Button'
import { GridRow } from '../components/Grid'
import { useState } from 'react'
import { axiosPrivate } from '../services'
import React from 'react'
import { TableTransactions, TableSupport, TableConfidence } from '../components/Table/Apriori'

export type ResponseApriori = {
  payload: {
    transactions: string[][]
    apriori: { menu: string[]; support: number }[]
    confidence: {
      Support: number
      Confidence: number
      X: string[]
      Y: string[]
    }[]
  }
}

export default function Apriori() {
  const [promoState, setPromoState] = React.useState<NewPromo>({ isActive: false, price: 0, menuId: null })
  const [apriori, setApriori] = useState<ResponseApriori['payload'] | null>(null)
  const handleGenerate = () => {
    axiosPrivate.get<ResponseApriori>('/apriori').then((val) => {
      console.log(val.data.payload)

      setApriori(val.data.payload)
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
          <div className="overflow-hidden rounded-md flex flex-col gap-5">
            <h4>List Transactions</h4>
            <TableTransactions data={apriori?.transactions || []} />
            <h4>List Item set</h4>
            <TableSupport data={apriori?.apriori ?? []} />
            <h4>List Confidence</h4>
            <TableConfidence data={apriori?.confidence ?? []} />
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
