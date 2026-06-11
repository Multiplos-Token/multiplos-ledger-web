'use client'

import TopMenu from './TopMenu'

export default function Home() {
  return (
    <div className="flex flex-col h-dvh w-dvw overflow-y-auto overflow-x-hidden">
      <TopMenu />
      <div className="grow flex items-center justify-center">User Page </div>
    </div>
  )
}
