import { isLogged } from '@/util/ServerHost'
import { redirect } from 'next/navigation'

export default async function Home() {
  if (await isLogged()) {
    return <div>Management</div>
  } else {
    redirect('/login')
  }
}
