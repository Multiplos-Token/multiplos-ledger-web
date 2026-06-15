import { isLogged } from '@/util/ServerHost'
import { redirect } from 'next/navigation'

import Management from './Management'

export default async function Home() {
  if (await isLogged()) {
    return <Management />
  } else {
    redirect('/login')
  }
}
