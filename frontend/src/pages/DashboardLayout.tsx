import { useQuery } from '@tanstack/react-query'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { axiosPrivate } from '@/services'
import { RoleType } from '@/hooks'

type UserData = { id: string; email: string; name: string; role: RoleType }
export function useUser() {
  const { data, refetch } = useQuery(
    ['user-data'],
    async () => {
      const { data } = await axiosPrivate.get<UserData>('/user/me')
      return data
    },
    { placeholderData: { email: '', name: '', id: '', role: 'casheer' } },
  )

  return {
    user: data! as UserData,
    refetchUser: refetch,
  }
}

export default function DashboardLayout() {
  useUser()
  return (
    <div className="w-screen h-screen flex bg-dark-1">
      <div className="w-[5rem] bg-dark-2 flex-shrink">
        <Sidebar />
      </div>
      <div className="flex flex-1 text-white">
        <Outlet />
      </div>
    </div>
  )
}
