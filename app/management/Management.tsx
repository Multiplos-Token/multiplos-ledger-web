'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { verifyUserSystemManager } from '@/business/user'
import { loadAllUsers } from '@/business/system'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import TopMenu from './TopMenu'
import UserList from './UserList'

export default function Management() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)
  const [users, setUsers] = useState<Array<any>>([])

  const initialize = async () => {
    if (await verifyUserSystemManager()) {
      const userData = await loadAllUsers()
      setUsers(userData.userData as Array<any>)
      setInitialized(true)
    } else {
      router.push('/enduser')
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return initialized ? (
    <div className="flex flex-col h-dvh w-dvw overflow-y-auto overflow-x-hidden">
      <Menu />
      <TopMenu
        onSelect={(s) => {
          if (s === 'panel') {
            router.push('/enduser')
          }
        }}
      />
      <UserList data={users} />
      <Footer />
    </div>
  ) : (
    <div className="flex min-h-full flex-col w-dvw">
      <Menu />
      <div className="grow-1 self-stretch flex justify-center items-center">
        Carregando...
      </div>
      <Footer />
    </div>
  )
}
