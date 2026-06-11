import TopMenu from '@/components/topmenu'
import { isLogged } from '@/util/ServerHost'
import { redirect } from 'next/navigation'
import Dashboard from './EnduserDashboard'

export default async function Home() {
  if (await isLogged()) {
    return <Dashboard />
  } else {
    redirect('/login')
  }
}
