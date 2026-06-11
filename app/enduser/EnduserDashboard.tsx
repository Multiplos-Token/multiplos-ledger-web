'use client'

import { useState } from 'react'

import TopMenu from './TopMenu'
import Files from './Files'
import Register from './Register'
import User from './User'

export default function Home() {
  const [selected, setSelected] = useState('register')
  return (
    <div className="flex flex-col h-dvh w-dvw overflow-y-auto overflow-x-hidden">
      <TopMenu
        onSelect={(s) => {
          setSelected(s)
        }}
      />
      <div className="grow flex items-center justify-center">
        {(() => {
          switch (selected) {
            case 'register':
              return <Register />
            case 'files':
              return <Files />
            case 'user':
              return <User />
            default:
              return null
          }
        })()}
      </div>
    </div>
  )
}
