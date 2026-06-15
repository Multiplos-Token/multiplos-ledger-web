'use client'

import { ReactNode, useState, useEffect } from 'react'
import {
  Input,
  Select,
  Button,
  ToggleButton,
  Spinner,
} from '@fluentui/react-components'
import { ArchiveRegular, PeopleRegular } from '@fluentui/react-icons'
import { useRouter } from 'next/navigation'

import { verifyUserSystemManager } from '@/business/user'

export default function TopMenu({
  onSelect,
}: {
  onSelect?: (selected: string) => void
}): ReactNode {
  const router = useRouter()

  const [selected, setSelected] = useState('users')
  const [isUserSystemManager, setUserSystemManager] = useState(false)

  const verifyUserPermission = async () => {
    const sysmag = await verifyUserSystemManager()
    setUserSystemManager(sysmag)
  }

  useEffect(() => {
    verifyUserPermission()
  }, [])

  return (
    <div className="flex">
      <Button
        shape="square"
        icon={<PeopleRegular />}
        appearance={selected == 'users' ? 'outline' : 'subtle'}
        onClick={() => {
          setSelected('users')
          if (onSelect) {
            onSelect('users')
          }
        }}
      >
        Usuários
      </Button>
      <div className="grow" />
      <Button
        shape="square"
        icon={<ArchiveRegular />}
        appearance={selected == 'panel' ? 'outline' : 'subtle'}
        onClick={() => {
          setSelected('panel')
          if (onSelect) {
            onSelect('panel')
          }
        }}
      >
        Painel Principal
      </Button>
    </div>
  )
}
