import { Button } from '@fluentui/react-components'
import { Button as AButton, Space } from 'antd'
import Link from 'next/link'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Home() {
  return (
    <div
      className="h-full flex flex-col items-center overflow-y-scroll"
      style={{
        backgroundImage: `linear-gradient(rgba(100, 100, 255, 0.4), rgba(100, 100, 255, 0.4)), url('${basePath}/b.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-logo-secondary h-16 min-h-16 self-stretch">Header</div>
      <div className="bg-logo-primary h-178 min-h-178 self-stretch flex">
        <div className="grow-3"></div>
        <div
          className="grow-1"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 1), rgba(24, 42, 85, 0.7)), url('${basePath}/m.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      <div className="bg-white h-96 min-h-96 self-stretch">this is a test</div>
      <div className="bg-logo-primary h-96 min-h-96 self-stretch flex">
        <div
          className="grow-1 text-white"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 0.8), rgba(24, 42, 85, 1)), url('${basePath}/c.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="grow-2 text-white"></div>
      </div>
      <div className="h-178 min-h-178 self-stretch">this is a test</div>
      <div className="bg-logo-primary h-130 min-h-130 self-stretch flex">
        <div
          className="grow-1 text-white"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 0.8), rgba(24, 42, 85, 1)), url('${basePath}/s.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="grow-2 text-white"></div>
      </div>
      <div className="bg-logo-secondary h-48 min-h-48 self-stretch">footer</div>
      {
        // <div className="text-3xl">BToken Ledger</div>
        // <div>
        //   Registre seus documentos:{' '}
        //   <Link className="font-bold" href="/login">
        //     login
        //   </Link>
        // </div>
        // <div>
        //   Não possui conta:{' '}
        //   <Link className="font-bold" href="/signup">
        //     inscreva-se
        //   </Link>
        // </div>
      }
    </div>
  )
}
