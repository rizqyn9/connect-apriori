import { useCallback } from 'react'
import { Dialog } from '@headlessui/react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '../Button'
import { H1 } from '../Typography'
import { DialogContainer, DialogContainerProps } from './DialogContainer'
import { TablePaymentOrder } from '../Table/TablePaymentOrder'
import { useToastStore } from '../Toast'
import { useOrderStore } from '../../hooks/useOrder'
import { useTransactionStore } from '../../hooks/useTransaction'
import { useOnce } from '../../hooks/useOnce'
import { transactionService } from '../../services'
import { toIDR } from '@/utils/base64'

type DialogPaymentProps = DialogContainerProps & {}

export function DialogPayment(props: DialogPaymentProps) {
  const { addToast } = useToastStore()
  const { props: transaction, clearTransaction } = useTransactionStore()
  const { orders, updateState, reset } = useOrderStore()

  const paidMutation = useMutation(transactionService.create, {
    onSuccess: () => {
      handleCancel()
      clearTransaction()
      reset()
      addToast({ msg: 'Transaction success' })
    },
    onError: () => addToast({ msg: 'Transaction failed', type: 'error' }),
  })

  useOnce(() => updateState('choose product'), [])

  const handleCancel = useCallback(() => props.setIsOpen(false), [])

  return (
    <DialogContainer {...props}>
      <Dialog.Panel className="bg-dark-2 border border-white p-5 text-white rounded-lg w-[50vw] h-[90vh] flex flex-col">
        <H1>Payment</H1>
        <div className="flex flex-col h-[95%] justify-between">
          {paidMutation.isLoading ? (
            <div className="grid w-full h-full place-content-center">Create order</div>
          ) : (
            <>
              <div className="py-4 h-[70%]">
                <p className="text-lg font-bold mb-3">Menu order</p>
                <div className="rounded-md overflow-scroll h-full">
                  <TablePaymentOrder orders={Object.values(orders)} />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-md font-bold">Transaction details</p>
                <p className="text-md font-bold">Total</p>
                <p className="self-end text-lg">{toIDR(transaction.total)}</p>
                <div className="flex justify-end gap-5">
                  <Button className="w-1/4" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button className="w-1/4" onClick={() => paidMutation.mutate()}>
                    Paid
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Dialog.Panel>
    </DialogContainer>
  )
}
