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
    <div className="flex flex-col h-full">
      <div
        className="flex flex-row cursor-pointer font-bold p-2 gap-2 hover:bg-gray-100 rounded"
        onClick={() => {
          setSelected('register')
          if (onSelect) {
            onSelect('register')
          }
        }}
      >
        <ArrowUploadRegular />
        Registrar
      </div>
      <div
        className="flex flex-row cursor-pointer font-bold p-2 gap-2 hover:bg-gray-100 rounded"
        onClick={() => {
          setSelected('files')
          if (onSelect) {
            onSelect('files')
          }
        }}
      >
        <ArchiveRegular />
        Arquivos
      </div>
      <div
        className="flex flex-row cursor-pointer font-bold p-2 gap-2 hover:bg-gray-100 rounded"
        onClick={() => {
          setSelected('verification')
          if (onSelect) {
            onSelect('verification')
          }
        }}
      >
        <ArchiveRegular />
        Verificar
      </div>

      {isUserSystemManager ? (
        <div
          className="flex flex-row cursor-pointer font-bold p-2 gap-2 hover:bg-gray-100 rounded"
          onClick={() => {
            router.push('/management')
          }}
        >
          <ArchiveRegular />
          Gerenciamento
        </div>
      ) : null}
      <div className="grow" />
      <div
        className="flex flex-row cursor-pointer font-bold p-2 gap-2 hover:bg-gray-100 rounded"
        onClick={() => {
          setSelected('user')
          if (onSelect) {
            onSelect('user')
          }
        }}
      >
        <PersonRegular />
        Usuário
      </div>
    </div>
  )
}
