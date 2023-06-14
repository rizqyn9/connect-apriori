import { useCallback, useEffect, useState } from 'react'
import { Button as PrimeButton } from 'primereact/button'
import { GridRow } from '../components/Grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosPrivate } from '@/services'
import { NonUndefined, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUser } from './DashboardLayout'
import { updateData } from '@/services/user.service'
import clsx from 'clsx'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { zodResolver } from '@hookform/resolvers/zod'

const date = new Intl.DateTimeFormat('id', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZoneName: 'short',
})

type Res = { email: string; createdAt: string; name: string; isAdmin: boolean }

export default function AccountManagement() {
  const { user } = useUser()
  return (
    <GridRow className="px-5 w-full flex-auto flex" title="Account Management">
      <div className="py-8 overflow-x-scroll flex flex-col gap-5">
        <Account />
        {user.role == 'admin' && <TableUserManagement />}
      </div>
    </GridRow>
  )
}

function TableUserManagement() {
  const { data } = useQuery(['user-management'], async () => {
    const { data } = await axiosPrivate.get<{ payload: Res[] }>('/user-management')
    return data?.payload
  })

  return (
    <DataTable value={data || []}>
      <Column header="#" body={(_, opts) => opts.rowIndex + 1} />
      <Column header="Nama" field="name" />
      <Column header="Email" field="email" />
      <Column header="Role" body={({ isAdmin }: NonUndefined<typeof data>[number]) => (isAdmin ? 'Admin' : 'Kasir')} />
      <Column header="Tgl registrasi" body={(field: NonUndefined<typeof data>[number]) => date.format(new Date(field.createdAt))} />
    </DataTable>
  )
}

const validatorGeneral = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  id: z.string(),
})

function Account() {
  const [active, setActive] = useState(false)
  const [state, setState] = useState<{ isEdit: boolean }>({ isEdit: false })
  const { user, refetchUser } = useUser()
  const { register, reset, handleSubmit, setValue, formState } = useForm<z.infer<typeof validatorGeneral>>()

  const { mutateAsync, isLoading } = useMutation(updateData)

  const handleOnEdit = useCallback(() => {
    setState((x) => ({ ...x, isEdit: true }))
  }, [setState])

  const handleOnCancel = useCallback(() => {
    setState((x) => ({ ...x, isEdit: false }))
    reset(user)
  }, [setState, reset, user])

  const handleOnSubmit = handleSubmit((data) => {
    mutateAsync(data).then(() => {
      refetchUser()
      setState((x) => ({ ...x, isEdit: false }))
    })
  })

  useEffect(() => {
    setValue('email', user.email)
    setValue('id', user.id)
    setValue('name', user.name)
  }, [user])

  return (
    <>
      <DialogChangePassword id={user.id} active={active} setActive={setActive} />
      <form
        className={clsx('w-[95%] bg-dark-2/40 p-4 md:p-8 rounded-lg mx-auto', {
          'ring-2 ring-primary': state.isEdit,
        })}
        onSubmit={handleOnSubmit}
      >
        <fieldset disabled={!state.isEdit} className="flex flex-col gap-5 items-center justify-center">
          <input type="hidden" {...register('id')} />
          <div className="flex flex-col w-full">
            <label className="text-md mb-3 font-bold">Username</label>
            <input className="rounded-md bg-dark-2 px-3 py-2 w-full " {...register('name')} />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-md mb-3 font-bold">Email</label>
            <input className="rounded-md bg-dark-2 px-3 py-2 w-full " {...register('email')} />
          </div>
        </fieldset>
        <div className="flex gap-5 items-center justify-end mt-5">
          {state.isEdit ? (
            <>
              <PrimeButton
                type="submit"
                size="small"
                severity="success"
                icon="pi pi-save"
                label="Simpan"
                disabled={!state.isEdit && formState.isDirty}
                loading={isLoading}
              />
              <PrimeButton type="button" size="small" severity="danger" icon="pi pi-undo" label="Batal" onClick={handleOnCancel} />
            </>
          ) : (
            <>
              <PrimeButton
                type="button"
                size="small"
                severity="success"
                icon="pi pi-user-edit"
                label="Ganti Password"
                onClick={() => setActive(true)}
              />
              <PrimeButton type="button" size="small" severity="success" icon="pi pi-user-edit" label="Edit" onClick={handleOnEdit} />
            </>
          )}
        </div>
      </form>
    </>
  )
}

type DialogChangePasswordProps = {
  active: boolean
  setActive: (arg: boolean) => void
  id: string
}

const validatePassword = z.object({
  password: z.string().min(5, 'Minimal 5 huruf'),
})

function DialogChangePassword(props: DialogChangePasswordProps) {
  const { active, setActive, id } = props
  const { register, formState, handleSubmit, reset } = useForm<z.infer<typeof validatePassword>>({
    resolver: zodResolver(validatePassword),
  })

  const { errors } = formState

  const { mutateAsync, isLoading } = useMutation(updateData)

  const handleOnSubmit = handleSubmit((data) => {
    mutateAsync({ id, password: data.password }).then(() => setActive(false))
  }, console.error)

  useEffect(() => {
    reset()
  }, [reset, active])

  return (
    <Dialog visible={active} onHide={() => setActive(false)} header={'Ganti password'}>
      <form className="py-4 flex flex-col gap-5" onSubmit={handleOnSubmit}>
        <InputText placeholder="Password baru" {...register('password')} type="password" />
        {errors.password?.message && <small className="p-error">{errors.password?.message}</small>}
        <PrimeButton type="submit" size="small" severity="success" icon="pi pi-save" label="Simpan" />
      </form>
    </Dialog>
  )
}
