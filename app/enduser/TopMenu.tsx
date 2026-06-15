'use client'

import { ReactNode, useState, useEffect } from 'react'
import {
  Input,
  Select,
  Button,
  ToggleButton,
  Spinner,
} from '@fluentui/react-components'
import {
  PersonRegular,
  ArrowUploadRegular,
  ArchiveRegular,
} from '@fluentui/react-icons'
import { useRouter } from 'next/navigation'

import { verifyUserSystemManager } from '@/business/user'

export default function TopMenu({
  onSelect,
}: {
  onSelect?: (selected: string) => void
}): ReactNode {
  const router = useRouter()

  const [selected, setSelected] = useState('register')
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
        icon={<ArrowUploadRegular />}
        appearance={selected == 'register' ? 'outline' : 'subtle'}
        onClick={() => {
          setSelected('register')
          if (onSelect) {
            onSelect('register')
          }
        }}
      >
        Registrar
      </Button>
      <Button
        shape="square"
        icon={<ArchiveRegular />}
        appearance={selected == 'files' ? 'outline' : 'subtle'}
        onClick={() => {
          setSelected('files')
          if (onSelect) {
            onSelect('files')
          }
        }}
      >
        Arquivos
      </Button>
      {isUserSystemManager ? (
        <Button
          shape="square"
          icon={<ArchiveRegular />}
          appearance="subtle"
          onClick={() => {
            router.push('/management')
          }}
        >
          Gerenciamento
        </Button>
      ) : null}
      <div className="grow" />
      <Button
        shape="square"
        icon={<PersonRegular />}
        appearance={selected == 'user' ? 'outline' : 'subtle'}
        onClick={() => {
          setSelected('user')
          if (onSelect) {
            onSelect('user')
          }
        }}
      >
        Usuário
      </Button>
    </div>
  )
}
