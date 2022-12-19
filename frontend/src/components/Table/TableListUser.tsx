import { TD, TH, TR } from '.'
import { Button } from '../Button'
import { useEffect, useState } from 'react'
import { Person } from '../../types/person.schema'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import { useOnce } from '../../hooks/useOnce'

export function TableListUser() {
  const [data, setData] = useState<Person[]>([])

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
        {data.length == 0 && (
          <TR>
            <TD className="text-center py-5" colSpan={4}>
              Data Not Found
            </TD>
          </TR>
        )}
        {data.map((val, i) => (
          <TR key={i}>
            <TD className="p-2 text-center" width={100}>
              {i + 1}
            </TD>
            <TD>{val.name}</TD>
            <TD>{val.email}</TD>
            <TD className="flex gap-5 items-center justify-center p-2">
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
