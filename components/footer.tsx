import Image from 'next/image'
import Link from 'next/link'

export default function Footer({ logged = false }: { logged?: boolean }) {
  return (
    <div className="bg-background h-fit min-h-fit self-stretch flex flex-col md:flex-row items-center p-8">
      <div className="self-stretch mb-4 md:mb-0 md:mr-8 flex flex-col">
        <Link href="/">
          <Image
            src="/home/logo-btoken.svg"
            alt="btoken"
            width={96}
            height={32}
            className="ml-2 hidden sm:block"
          />
          <Image
            src="/home/logo-btoken.svg"
            alt="btoken"
            width={48}
            height={16}
            className="ml-2 sm:hidden"
          />
        </Link>
      </div>
      <div className="grow-1 mb-4 md:mb-0">
        <ul>
          {!logged ? (
            <>
              <li>
                <Link className="font-bold" href="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="font-bold" href="/signup">
                  Cadastro
                </Link>
              </li>
            </>
          ) : null}
          <li>
            <Link className="font-bold" href="/about">
              Sobre nós
            </Link>
          </li>
          <li>
            <Link className="font-bold" href="/contact">
              Contato
            </Link>
          </li>
          <li>
            <Link className="font-bold" href="/privacy">
              Política de Privacidade
            </Link>
          </li>
          <li>
            <Link className="font-bold" href="/use">
              Termos de Uso
            </Link>
          </li>
          <li>
            <a href="/docs" className="font-bold">
              Documentação e API
            </a>
          </li>
        </ul>
      </div>
      <div className="self-stretch flex">
        Todos os direitos reservados - 2026.
      </div>
    </div>
  )
}
