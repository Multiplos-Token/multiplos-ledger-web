'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { verifyUserSystemManager } from '@/business/user'

export default function Management() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)

  const initialize = async () => {
    if (await verifyUserSystemManager()) {
      setInitialized(true)
    } else {
      router.push('/enduser')
    }
  }

  useEffect(() => {
    initialize()
  }, [])

  return initialized ? (
    <div className="flex min-h-full flex-col w-dvw items-center justify-center">
      Management
    </div>
  ) : (
    <div className="flex min-h-full flex-col w-dvw items-center justify-center">
      Carregando...
    </div>
  )
}
