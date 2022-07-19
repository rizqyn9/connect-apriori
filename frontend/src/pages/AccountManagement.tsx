import React from 'react'
import { Button } from '../components/Button'
import { DialogChangePassword } from '../components/Dialog'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'
import { TableListAdmin, UserProps } from '../components/Table/TableListAdmin'

export default function AccountManagement() {
    const [isOpenChangePassword, setIsOpenChangePassword] =
        React.useState<boolean>(false)

    return (
        <GridRow
            className="px-5 w-full flex-auto flex"
            title="Account Management"
        >
            <div className="py-8 overflow-x-scroll">
                {/* Curent User */}
                <div className="flex flex-col gap-5 items-center justify-center">
                    <div className="flex flex-col w-1/2">
                        <label className="text-md mb-3 font-bold">
                            Username
                        </label>
                        <input
                            className="rounded-md bg-dark-2 px-3 py-2 w-full "
                            readOnly
                            value="Username Test"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label className="text-md mb-3 font-bold">Email</label>
                        <input
                            className="rounded-md bg-dark-2 px-3 py-2 w-full "
                            readOnly
                            value="Test@gmail.com"
                        />
                    </div>
                    <div className="flex flex-col mt-5">
                        <Button onClick={() => setIsOpenChangePassword(true)}>
                            Change Password
                        </Button>
                    </div>
                </div>
                <DialogChangePassword
                    isOpen={isOpenChangePassword}
                    setIsOpen={setIsOpenChangePassword}
                />
                {/* Admin look all user */}
                <div className="flex flex-col gap-5 py-8">
                    <H1>Admin</H1>
                    <TableListAdmin data={mockUser} />
                    <H1>User</H1>
                    <TableListAdmin data={mockUser} />
                </div>
            </div>
        </GridRow>
    )
}

const mockUser: UserProps[] = [
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
    {
        _id: 'asda',
        username: 'test2',
        email: 'sadasd@test.com',
    },
]
