import { isLogged } from '@/util/ServerHost'
import { redirect } from 'next/navigation'
import LoginForm from './LoginForm'
import Menu from '@/components/menu'
import Footer from '@/components/footer'

export default async function Home() {
  if (await isLogged()) {
    redirect('/enduser')
  } else {
    return (
      <div className="h-full flex flex-col items-center overflow-y-scroll">
        <Menu />
        <LoginForm />
        <Footer />
      </div>
    )
  }
}
