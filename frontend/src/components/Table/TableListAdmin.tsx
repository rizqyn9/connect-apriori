import { TD, TH, TR } from '.'
import { Button } from '../Button'

type TableListAdminProps = {
    data: UserProps[]
}

export function TableListAdmin({ data }: TableListAdminProps) {
    return (
        <table className="w-full bg-dark-2 rounded-lg">
            <thead>
                <tr className="bg-primary">
                    <TH>No</TH>
                    <TH>Username</TH>
                    <TH>Email</TH>
                    <TH>Action</TH>
                </tr>
            </thead>
            <tbody className="border-2 border-white">
                {data.map((val, i) => (
                    <TR key={i}>
                        <TD className="p-2 text-center" width={100}>
                            {i + 1}
                        </TD>
                        <TD>{val.username}</TD>
                        <TD>{val.email}</TD>
                        <TD className="flex gap-5">
                            <Button className="w-1/3">Edit</Button>
                            <Button className="w-1/3">Remove</Button>
                        </TD>
                    </TR>
                ))}
            </tbody>
        </table>
    )
}

export type UserProps = {
    _id: string
    username: string
    email: string
}
