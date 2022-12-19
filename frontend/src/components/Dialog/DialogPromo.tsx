import { axiosPrivate } from '@/services'
import { Dialog } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Button } from '../Button'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'
import qs from 'query-string'

export type DialogPromoProps = DialogContainerProps & {}

export function DialogPromo(props: DialogContainerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const mutate = useMutation(async (cardId?: string) => {
    const {
      data: { isCustomerExist },
    } = await axiosPrivate.get<{ isCustomerExist: boolean }>('/customer/check-exist?' + qs.stringify({ cardId }))
    return {
      isCustomerExist,
    }
  })

  useEffect(() => {
    mutate.reset()
  }, [props.isOpen])

  return (
    <DialogContainer {...props}>
      <Dialog.Panel className="bg-dark-2 border-2 border-white p-5 text-white rounded-lg w-[50vw] z-[100] h-max flex flex-col">
        <H1>Promo</H1>
        <div className="m-auto w-auto md:w-80 flex items-center flex-col gap-3">
          <p className="font-semibold">User</p>
          <input className="border bg-dark-1 px-4 py-1 rounded-lg" placeholder="User id" ref={inputRef} />
          <div className="flex gap-5">
            <Button
              className="px-5 w-36"
              onClick={() => mutate.mutate(inputRef.current?.value)}
              disabled={(inputRef.current?.value.length || '') < 3 && mutate.isLoading}
            >
              {mutate.isLoading ? 'Loading ...' : 'Check'}
            </Button>
            <Button className="px-5 w-36" disabled={mutate.isLoading || !Boolean(!mutate.data?.isCustomerExist)}>
              Gunakan
            </Button>
          </div>
          {mutate.isSuccess ? mutate.data?.isCustomerExist ? <p>Exist</p> : <p>New</p> : null}
        </div>
      </Dialog.Panel>
    </DialogContainer>
  )
}
