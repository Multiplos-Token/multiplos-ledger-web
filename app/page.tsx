import { Button } from '@fluentui/react-components'
import Link from 'next/link'
import Menu from '@/components/menu'
import Footer from '@/components/footer'

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
      <Menu />
      <div className="bg-logo-primary h-178 min-h-178 self-stretch flex relative">
        <div className="grow-3"></div>
        <div
          className="grow-1"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 1), rgba(24, 42, 85, 0.7)), url('${basePath}/m.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-background">
          contempt for human rights have resulted
        </div>
      </div>
      <div className="bg-background h-96 min-h-96 self-stretch">
        contempt for human rights have resulted
      </div>
      <div className="bg-logo-primary h-96 min-h-96 self-stretch flex relative">
        <div
          className="grow-1 text-background"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 0.8), rgba(24, 42, 85, 1)), url('${basePath}/c.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="grow-2 text-background"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-background">
          contempt for human rights have resulted
        </div>
      </div>
      <div className="h-178 min-h-178 self-stretch">
        contempt for human rights have resulted
      </div>
      <div className="bg-logo-primary h-130 min-h-130 self-stretch flex relative">
        <div
          className="grow-1 text-background"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 0.8), rgba(24, 42, 85, 1)), url('${basePath}/s.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="grow-2 text-background"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center text-background">
          contempt for human rights have resulted
        </div>
      </div>
      <Footer />
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
