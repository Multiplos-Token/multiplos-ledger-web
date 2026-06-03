import { Button } from '@fluentui/react-components'
import { Button as AButton, Space } from 'antd'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      <div className="text-3xl">BToken Ledger</div>
      <div>
        Registre seus documentos:{' '}
        <Link className="font-bold" href="/login">
          login
        </Link>
      </div>
      <div>
        Não possui conta:{' '}
        <Link className="font-bold" href="/signup">
          inscreva-se
        </Link>
      </div>
    </div>
  )
}
