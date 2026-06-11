import { isLogged } from '@/util/ServerHost'
import { redirect } from 'next/navigation'
import SignupForm from './SignupForm'

export default async function Home() {
  if (await isLogged()) {
    redirect('/enduser')
  } else {
    return <SignupForm />
  }
}
