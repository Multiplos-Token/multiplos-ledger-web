'use client'

import { ReactNode, useState } from 'react'
import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Drawer,
  useRestoreFocusSource,
  useRestoreFocusTarget,
} from '@fluentui/react-components'
import Image from 'next/image'
import Link from 'next/link'

import { Navigation48Regular, Navigation24Regular } from '@fluentui/react-icons'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Menu({
  logged = true,
  children,
}: {
  logged?: boolean
  children?: ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  // all Drawers need manual focus restoration attributes
  // unless (as in the case of some inline drawers, you do not want automatic focus restoration)
  const restoreFocusTargetAttributes = useRestoreFocusTarget()
  const restoreFocusSourceAttributes = useRestoreFocusSource()

  return (
    <div className="bg-background h-16 min-h-16 self-stretch flex">
      {children ? (
        <>
          <div
            className="self-stretch p-2 flex items-center justify-center cursor-pointer"
            {...restoreFocusTargetAttributes}
            onClick={() => {
              console.log('Teste teste teste teste.....')
              setIsOpen(!isOpen)
            }}
          >
            <Navigation24Regular />
          </div>
          <Drawer
            {...restoreFocusSourceAttributes}
            type="overlay"
            separator
            open={isOpen}
            onOpenChange={(_, { open }) => setIsOpen(open)}
          >
            <DrawerHeader>
              <DrawerHeaderTitle>Conteúdos do menu</DrawerHeaderTitle>
            </DrawerHeader>
            <DrawerBody>
              <p>Drawer content</p>
            </DrawerBody>
          </Drawer>
        </>
      ) : null}
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
      {!logged ? (
        <div className="flex items-center justify-center mr-2 gap-2">
          <Button
            onClick={() => {
              document.location.href = `${basePath}/login`
            }}
          >
            Login
          </Button>
          <Button
            appearance="primary"
            onClick={() => {
              document.location.href = `${basePath}/signup`
            }}
          >
            Cadastro
          </Button>
        </div>
      ) : null}
    </div>
  )
}
