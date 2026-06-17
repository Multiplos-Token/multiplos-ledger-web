'use client'

import { useState } from 'react'

import TopMenu from './TopMenu'
import Files from './Files'
import Register from './Register'
import User from './User'
import Verification from './Verification'

export default function Home() {
  const [selected, setSelected] = useState('register')
  return (
    <div className="flex flex-col h-dvh w-dvw overflow-y-auto overflow-x-hidden">
      <TopMenu
        onSelect={(s) => {
          setSelected(s)
        }}
      />
      {(() => {
        switch (selected) {
          case 'register':
            return (
              <div className="grow flex items-center justify-center">
                <Register />
              </div>
            )
          case 'files':
            return <Files />
          case 'user':
            return (
              <div className="grow flex items-center justify-center">
                <User />
              </div>
            )
          case 'verification':
            return (
              <div className="grow flex items-center justify-center">
                <Verification />
              </div>
            )

          default:
            return null
        }
      })()}
    </div>
  )
}
