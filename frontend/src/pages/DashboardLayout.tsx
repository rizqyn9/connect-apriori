import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
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
