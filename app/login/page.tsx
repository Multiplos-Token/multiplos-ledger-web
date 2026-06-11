import { isLogged } from '@/util/ServerHost'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'

export default async function Home() {
  if (await isLogged()) {
    redirect('/enduser')
  } else {
    return <LoginForm />
  }
}
