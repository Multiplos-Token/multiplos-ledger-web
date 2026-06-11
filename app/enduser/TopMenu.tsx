import { ReactNode, useState, useEffect } from 'react'
import { Input, Select, Button, Spinner } from '@fluentui/react-components'
import {
  PersonRegular,
  ArrowUploadRegular,
  ArchiveRegular,
} from '@fluentui/react-icons'
import { useRouter } from 'next/navigation'

export default function TopMenu({
  onSelect,
}: {
  onSelect?: (selected: string) => void
}): ReactNode {
  const router = useRouter()

  const [selected, setSelected] = useState('register')
  const [isUserSystemManager, setUserSystemManager] = useState(false)

  const verifyUserPermission = async () => {
    // TODO: Verify if user is system manager or root, to show the "Management" button
    console.log('Verify user permissions here.')
    setUserSystemManager(false)
  }

  useEffect(() => {
    verifyUserPermission()
  }, [])

  return (
    <div className="flex">
      <Button
        icon={<ArrowUploadRegular />}
        appearance="subtle"
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
        icon={<ArchiveRegular />}
        appearance="subtle"
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
        icon={<PersonRegular />}
        appearance="subtle"
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
