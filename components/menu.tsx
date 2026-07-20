'use client'

import { Button } from '@fluentui/react-components'
import Image from 'next/image'
import Link from 'next/link'

export default function Menu({}) {
  return (
    <div className="bg-background h-16 min-h-16 self-stretch flex">
      <div className="self-stretch flex flex-col">
        <div className="flex-grow" />
        <Link href="/">
          <Image
            src="/home/logo-btoken.svg"
            alt="btoken"
            width={192}
            height={64}
            className="ml-2 hidden sm:block"
          />
          <Image
            src="/home/logo-btoken.svg"
            alt="btoken"
            width={96}
            height={32}
            className="ml-2 sm:hidden"
          />
        </Link>
        <div className="flex-grow" />
      </div>
      <div className="grow-1" />
      <div className="flex items-center justify-center mr-2 gap-2">
        <Button>Login</Button>
        <Button appearance="primary">Cadastro</Button>
      </div>
    </div>
  )
}
