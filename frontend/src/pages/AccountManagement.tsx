import { useCallback, useEffect, useState } from 'react'
import { Button, Button as PrimeButton } from 'primereact/button'
import { GridRow } from '../components/Grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authService, axiosPrivate } from '@/services'
import { Controller, NonUndefined, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUser } from './DashboardLayout'
import { updateData } from '@/services/user.service'
import clsx from 'clsx'
import { DataTable, DataTableRowEditCompleteEvent } from 'primereact/datatable'
import { Column, ColumnEditorOptions } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown'
import { ROLE } from '../hooks/useAuth'
import { Tag } from 'primereact/tag'
import { SignUpSchema, signUpSchema } from '../utils/zod.schema'
import { useToastStore } from '@/components/Toast'

const date = new Intl.DateTimeFormat('id', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

type Res = { email: string; createdAt: string; name: string; isAdmin: boolean; _id: string }

export default function AccountManagement() {
  const { user } = useUser()
  return (
    <GridRow className="px-5 w-full flex-auto flex" title="Account Management">
      <div className="py-8 overflow-x-scroll flex flex-col gap-5">
        <Account />
        {user.role == 'admin' && <AccountCreator />}
        {user.role == 'admin' && <TableUserManagement />}
      </div>
    </GridRow>
  )
}

const newAccount = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
})

export function AccountCreator() {
  const [visible, setVisible] = useState(false)
  const { addToast } = useToastStore()
  const { control, handleSubmit } = useForm<z.infer<typeof newAccount>>({
    resolver: zodResolver(newAccount),
  })

  const { mutateAsync } = useMutation((data: SignUpSchema) => authService.signUp(data), {
    onSuccess: ({ success, msg }) => {
      setVisible(false)
      addToast({ msg, type: success ? 'success' : 'error' })
      refetch()
    },
  })

  const { refetch } = useQuery(['user-management'], async () => axiosPrivate.get<{ payload: Res[] }>('/user-management').then((x) => x.data.payload))

  const handleOnSubmit = handleSubmit((data) => {
    mutateAsync(data)
  }, console.error)

  return (
    <div className="flex">
      <Button label="Tambah Akun" className="ml-auto" onClick={() => setVisible(true)} />
      <Dialog visible={visible} onHide={() => setVisible(false)} header="Akun baru">
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          <Controller control={control} name="name" render={({ field }) => <InputText placeholder="Nama" {...field} />} />
          <Controller control={control} name="email" render={({ field }) => <InputText placeholder="Email" type="email" {...field} />} />
          <Controller control={control} name="password" render={({ field }) => <InputText placeholder="Password" type="password" {...field} />} />
          <Button label="Tambah" />
        </form>
      </Dialog>
    </div>
  )
}

function TableUserManagement() {
  const [active, setActive] = useState<string | null>(null)
  const { addToast } = useToastStore()

  const { data, refetch } = useQuery(['user-management'], async () => {
    const { data } = await axiosPrivate.get<{ payload: Res[] }>('/user-management')
    return data?.payload
  })

  const { mutateAsync } = useMutation(updateData)
  const { mutate } = useMutation((id: string) => axiosPrivate.delete('/user/' + id), {
    onSuccess() {
      refetch()
      addToast({ msg: 'Sukses menhapus akun' })
    },
  })

  const onRowEditComplete = (e: DataTableRowEditCompleteEvent) => {
    const { email, field_3, name, _id } = e.newData
    const isAdmin = field_3 ? (field_3 === 'admin' ? true : false) : e.data.isAdmin

    mutateAsync({
      id: _id,
      email,
      isAdmin,
      name,
    }).then(() => refetch())
  }

  const textEditor = (options: ColumnEditorOptions) => {
    return (
      <InputText
        style={{ width: '100%' }}
        type="text"
        value={options.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => options.editorCallback?.(e.target.value)}
      />
    )
  }

  const roleEditor = (options: ColumnEditorOptions) => {
    return (
      <Dropdown
        value={options.value}
        options={ROLE.options}
        onChange={(e: DropdownChangeEvent) => options.editorCallback?.(e.value)}
        placeholder="Select a Status"
        itemTemplate={(option) => {
          return <Tag value={option} severity={option == ROLE.Enum.admin ? 'success' : 'warning'}></Tag>
        }}
      />
    )
  }

  const handleSetActive = (arg: boolean) => {
    setActive(null)
  }

  return (
    <>
      <DialogChangePassword active={!!active} setActive={handleSetActive} id={active!} />
      <DataTable value={data || []} editMode="row" tableStyle={{ minWidth: '50rem' }} dataKey="_id" onRowEditComplete={onRowEditComplete}>
        <Column header="#" body={(_, opts) => opts.rowIndex + 1} />
        <Column header="Nama" field="name" editor={(options) => textEditor(options)} />
        <Column header="Email" field="email" editor={(options) => textEditor(options)} style={{ width: '20%' }} />
        <Column
          header="Role"
          body={({ isAdmin }: NonUndefined<typeof data>[number]) => (
            <Tag
              style={{ textTransform: 'capitalize' }}
              value={isAdmin ? ROLE.Enum.admin : ROLE.Enum.casheer}
              severity={isAdmin ? 'success' : 'warning'}
            ></Tag>
          )}
          editor={(options) => roleEditor(options)}
        />
        <Column header="Tgl registrasi" body={(field: NonUndefined<typeof data>[number]) => date.format(new Date(field.createdAt))} />
        <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }} />
        <Column
          headerStyle={{ minWidth: '15rem' }}
          bodyStyle={{ textAlign: 'center' }}
          body={(field: NonUndefined<typeof data>[number]) => (
            <span className="p-buttonset">
              <PrimeButton type="button" size="small" severity="help" label="Ganti" onClick={() => setActive(field._id)} />
              <PrimeButton type="button" size="small" severity="danger" label="Hapus" onClick={() => mutate(field._id)} />
            </span>
          )}
        />
      </DataTable>
    </>
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
  password: z.string().min(1, 'Minimal 1 huruf'),
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

  const handleClose = useCallback(() => {
    if (isLoading) return
    setActive(false)
  }, [setActive, isLoading])

  useEffect(() => {
    reset()
  }, [reset, active])

  return (
    <Dialog visible={active} onHide={handleClose} header={'Ganti password'}>
      <form className="py-4 flex flex-col gap-5" onSubmit={handleOnSubmit}>
        <InputText placeholder="Password baru" {...register('password')} type="password" />
        {errors.password?.message && <small className="p-error">{errors.password?.message}</small>}
        <PrimeButton type="submit" size="small" severity="success" icon="pi pi-save" label="Simpan" />
      </form>
    </Dialog>
  )
}
