'use client'

import { useState } from 'react'
import { Button, Spinner } from '@fluentui/react-components'
import { ArrowExitRegular } from '@fluentui/react-icons'
import { userLogoff } from '@/business/user'
import { useRouter } from 'next/navigation'

export default function Files() {
  const router = useRouter()
  const [loggingOff, setLoggingOff] = useState(false)

  return (
    <div className="w-9/10 md:w-4/5 min-h-full flex flex-col">
      <div className="grow-1 flex items-center justify-center">
        Dados de usuário
      </div>
      <div className="grow-2 flex items-center justify-center">
        Dados financeiros
      </div>
      <div className="flex flex-row-reverse mb-4">
        <Button
          icon={<ArrowExitRegular />}
          onClick={async () => {
            await userLogoff()
            router.push('/')
          }}
          appearance="subtle"
          disabled={loggingOff}
        >
          Logoff {loggingOff ? <Spinner size="tiny" /> : null}
        </Button>
      </div>
    </div>
  )
}
