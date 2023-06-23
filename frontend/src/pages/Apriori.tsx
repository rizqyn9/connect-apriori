import { Button } from '../components/Button'
import { GridRow } from '../components/Grid'
import { useState } from 'react'
import { axiosPrivate } from '../services'
import React from 'react'
import { TableTransactions, TableSupport, TableConfidence } from '../components/Table/Apriori'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import qs from 'query-string'
import { useToastStore } from '@/components/Toast'

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

const schema = z.object({
  confidence: z.preprocess((x) => Number(x), z.number().min(1).max(100)),
  support: z.preprocess((x) => Number(x), z.number().min(1).max(100)),
})

type Schema = z.infer<typeof schema>

export default function Apriori() {
  const { handleSubmit, register } = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { addToast } = useToastStore()
  const [apriori, setApriori] = useState<ResponseApriori['payload'] | null>(null)
  const handleGenerate = (data: Schema) => {
    axiosPrivate.get<ResponseApriori>('/apriori?' + qs.stringify(data)).then((val) => {
      setApriori(val.data.payload)
      addToast({
        msg: 'Success generated apriori data',
      })
    })
  }

  const handleOnSubmit = handleSubmit((data) => {
    handleGenerate(data)
  })

  return (
    <GridRow className="px-5 w-full flex-auto overflow-x-scroll text-sm" title="Proses Apriori">
      <div className="py-8 overflow-x-scroll">
        <form className="flex gap-4 flex-col p-4" onClick={handleOnSubmit}>
          <div className="flex gap-4">
            <input
              {...register('confidence')}
              placeholder="Confidence"
              type="number"
              className="py-2 px-3 rounded-md text-white bg-form outline-2 border-2 border-dark-line outline-offset-5 outline-red-200 "
            />
            <input
              {...register('support')}
              placeholder="Support"
              type="number"
              className="py-2 px-3 rounded-md text-white bg-form outline-2 border-2 border-dark-line outline-offset-5 outline-red-200 "
            />
          </div>
          <Button size="sm" type="submit">
            Generate
          </Button>
        </form>
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
        </div>
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
