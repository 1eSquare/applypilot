import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar />
      <main className="ml-60 flex-1 min-h-screen overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
