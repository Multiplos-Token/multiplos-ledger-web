import { Input, Select, Button, Spinner } from '@fluentui/react-components'
import {
  PersonRegular,
  ArrowUploadRegular,
  ArchiveRegular,
} from '@fluentui/react-icons'

export default function TopMenu({}) {
  return (
    <div className="flex">
      <Button icon={<ArrowUploadRegular />} appearance="subtle">
        Registrar
      </Button>
      <Button icon={<ArchiveRegular />} appearance="subtle">
        Arquivos
      </Button>
      <div className="grow" />
      <Button icon={<PersonRegular />} appearance="subtle">
        Usuário
      </Button>
    </div>
  )
}
