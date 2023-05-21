import { axiosPrivate } from '@/services'
import { Dialog } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'
import qs from 'query-string'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToastStore } from '../Toast'
import { useOrderStore } from '@/hooks'

export type DialogPromoProps = DialogContainerProps & {}

const schema = z.object({
  cardId: z.string().min(2),
})

type Schema = z.infer<typeof schema>

export function DialogPromo(props: DialogContainerProps) {
  const { setIsOpen } = props
  const { addToast } = useToastStore()
  const { setCardId } = useOrderStore()
  const { handleSubmit, register, reset } = useForm<Schema>({
    resolver: zodResolver(schema),
  })

  const mutate = useMutation(
    async (cardId?: string) => {
      const {
        data: { payload },
      } = await axiosPrivate.get<{ payload: { isCustomerExist: boolean } }>('/customer/check-exist?' + qs.stringify({ cardId }))

      const { isCustomerExist } = payload
      return {
        isCustomerExist,
        cardId,
      }
    },
    {
      onSuccess: ({ cardId, isCustomerExist }) => {
        if (isCustomerExist) {
          addToast({ msg: 'Pengguna sudah terdaftar, tidak dapat menggunakan promo' })
        } else {
          addToast({ msg: 'Pengguna dapat menggunakan promo ' + cardId })
          setCardId(cardId!)
        }
        setIsOpen(false)
        reset()
      },
    },
  )

  useEffect(() => {
    mutate.reset()
  }, [props.isOpen])

  const handleOnSubmit = handleSubmit((data) => {
    mutate.mutate(data.cardId)
  })

  const isLoading = mutate.isLoading

  return (
    <DialogContainer {...props}>
      <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] z-[100] h-max flex flex-col">
        <H1>Promo</H1>
        <fieldset disabled={isLoading}>
          <form className="m-auto w-auto md:w-80 flex items-center flex-col gap-3" onSubmit={handleOnSubmit}>
            <p className="font-semibold">User</p>
            <input className="border bg-dark-1 px-4 py-1 rounded-lg" placeholder="Card id" {...register('cardId')} />
            {mutate.isSuccess ? mutate.data?.isCustomerExist ? <p>Exist</p> : <p>New</p> : null}
          </form>
        </fieldset>
      </Dialog.Panel>
    </DialogContainer>
  )
}
