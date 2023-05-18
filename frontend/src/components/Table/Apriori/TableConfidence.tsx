import { Button } from '@/components/Button'
import { DialogContainer } from '@/components/Dialog/DialogContainer'
import { Dialog } from '@headlessui/react'
import { useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ResponseApriori } from '../../../pages/Apriori'
import { useMutation } from '@tanstack/react-query'
import { axiosPrivate } from '@/services'
import { convertBase64 } from '@/utils/base64'

type TableConfidenceProps = {
  data: ResponseApriori['payload']['confidence']
}

type State = {
  image: null | string
  price: number
  menu: string[]
  packetName: string
}

const initialState = {
  image: null,
  price: 0,
  menu: [],
  packetName: '',
}

export function TableConfidence(props: TableConfidenceProps) {
  const { data } = props
  const [state, setState] = useState<State>(initialState)
  const [dialog, setDialog] = useState(false)
  const mutate = useMutation(
    async () => {
      const { data } = await axiosPrivate.post('/promo', state)
      console.log({ data })
    },
    {
      onSuccess: () => {
        setDialog(false)
        setState(initialState)
      },
    },
  )

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <DialogContainer isOpen={dialog} setIsOpen={setDialog}>
        <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] z-[100] h-max flex flex-col gap-5">
          <p className="text-lg font-semibold">Tambahkan Kombinasi Menu ke Promo</p>
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={(e) => {
              e.target.files?.length && convertBase64(e.target.files[0]).then((base64) => setState((x) => ({ ...x, image: base64 })))
            }}
          />
          <div className="bg-dark-1 p-3 rounded-lg">
            {state.menu?.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
          <input
            type="text"
            className="p-2 bg-dark-1 rounded-lg"
            placeholder="Nama Paket"
            onChange={(e) => setState((x) => ({ ...x, packetName: e.target.value }))}
            value={state.packetName}
          />
          <input
            type="number"
            className="p-2 bg-dark-1 rounded-lg"
            placeholder="Masukkan harga"
            onChange={(e) => setState((x) => ({ ...x, price: e.target.value as any as number }))}
            value={state.price}
          />
          <Button className="w-2/3 m-auto" onClick={() => inputRef.current?.click()}>
            Tambahkan Gambar
          </Button>
          <Button disabled={mutate.isLoading} onClick={() => mutate.mutate()}>
            Submit
          </Button>
        </Dialog.Panel>
      </DialogContainer>
      <DataTable value={data} paginator={true} rows={10} rowsPerPageOptions={[5, 10, 20, 50]} sortMode="multiple">
        <Column header="#" body={(_, opts) => opts.rowIndex + 1} />
        <Column header="Kombinasi" body={(field: typeof data[number]) => [...field.Y, ...field.X].join(', ')} />
        {/* <Column header="X" field="X" body={(field: typeof data[number]) => field.X.join(' - ')} />
        <Column header="Y" field="Y" body={(field: typeof data[number]) => field.Y.join(' - ')} /> */}
        <Column header="Support" field="Support" sortable />
        <Column header="Confidence" field="Confidence" sortable />
      </DataTable>
    </>
  )
}
