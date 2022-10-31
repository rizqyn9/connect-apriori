import React from 'react'
import { Button } from '../components/Button'
import { DialogChangePassword } from '../components/Dialog'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { TableListAdmin } from '../components/Table/TableListAdmin'
import { TableListUser } from '../components/Table/TableListUser'
import { useQuery } from '@tanstack/react-query'
import { axiosPrivate } from '@/services'
import Table, { TD } from '@/components/Table/Table'

type Res = { email: string; createdAt: string; name: string; isAdmin: boolean }
export default function AccountManagement() {
    const query = useQuery(['user-management'], async () => axiosPrivate.get<{ payload: Res[] }>('/user-management'))
    const [isOpenChangePassword, setIsOpenChangePassword] = React.useState<boolean>(false)

    return (
        <GridRow className="px-5 w-full flex-auto flex" title="Account Management">
            <div className="py-8 overflow-x-scroll">
                {/* Curent User */}
                <div className="flex flex-col gap-5 items-center justify-center">
                    <div className="flex flex-col w-1/2">
                        <label className="text-md mb-3 font-bold">Username</label>
                        <input className="rounded-md bg-dark-2 px-3 py-2 w-full " readOnly value="Username Test" />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-md mb-3 font-bold">Email</label>
                        <input className="rounded-md bg-dark-2 px-3 py-2 w-full " readOnly value="Test@gmail.com" />
                    </div>
                    <div className="flex flex-col mt-5">
                        <Button onClick={() => setIsOpenChangePassword(true)}>Change Password</Button>
                    </div>
                </div>
                <DialogChangePassword isOpen={isOpenChangePassword} setIsOpen={setIsOpenChangePassword} />

                <div className="flex flex-col gap-5 py-8">
                    <H1>Admin</H1>
                    <Table
                        headers={['No', 'Username', 'Email', 'Action', 'Created at']}
                        data={
                            query.data?.data.payload
                                .filter((x) => x.isAdmin)
                                .map((x, i) => {
                                    return (
                                        <>
                                            <TD>{i}</TD>
                                            <TD>{x.name}</TD>
                                            <TD>{x.email}</TD>
                                            <TD>
                                                <Button children="Demote" />
                                            </TD>
                                            <TD>{new Date(x.createdAt).toLocaleString()}</TD>
                                        </>
                                    )
                                }) || []
                        }
                    />
                    <H1 className="mt-8">User</H1>
                    <Table
                        headers={['No', 'Username', 'Email', 'Action', 'Created at']}
                        data={
                            query.data?.data.payload
                                .filter((x) => !x.isAdmin)
                                .map((x, i) => (
                                    <>
                                        <TD>{i}</TD>
                                        <TD>{x.name}</TD>
                                        <TD>{x.email}</TD>
                                        <TD>
                                            <Button children="Promote" />
                                        </TD>
                                        <TD>{new Date(x.createdAt).toLocaleString()}</TD>
                                    </>
                                )) || []
                        }
                    />
                </div>
            </div>
        </GridRow>
    )
}
