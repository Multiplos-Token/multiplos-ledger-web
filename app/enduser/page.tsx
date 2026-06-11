import TopMenu from '@/components/topmenu'

export default function Home() {
  return (
    <div className="flex flex-col h-dvh w-dvw overflow-auto">
      <TopMenu />
      <div className="grow flex items-center justify-center">
        This is end-user page.
      </div>
    </div>
  )
}
