'use client'

import { Button } from '@fluentui/react-components'
import {
  LockClosedRegular,
  MoneyRegular,
  CalendarArrowCounterclockwiseRegular,
  FingerprintRegular,
  StarRegular,
} from '@fluentui/react-icons'
import Link from 'next/link'
import Image from 'next/image'
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
        <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-left text-background m-8 gap-2 md:gap-8">
          <div className="text-logo-secondary self-stretch text-2xl md:text-5xl">
            Confiabilidade e Segurança Digital:
          </div>
          <div className="grow-1" />
          <div className="self-stretch text-lg md:text-2xl">
            A <b>Btoken</b> oferece soluções de confiabilidade digital, baseadas
            na Tecnologia Blockchain, em{' '}
            <a className="font-bold" href="#environment">
              ambiente de alta segurança
            </a>
            , para que você possa:
          </div>
          <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
            <CalendarArrowCounterclockwiseRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
            <div>
              Registrar os seus documentos digitalmente, a fim de demonstrar
              suas datas de autoria e posse.
            </div>
          </div>
          <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
            <FingerprintRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
            <div>
              Autenticar ativos digitais, em qualquer formato, até mesmo imagem,
              audio ou vídeo.
            </div>
          </div>
          <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
            <MoneyRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
            <div>
              Manter ativos digitais perenemente disponíveis com absoluto
              controle.
            </div>
          </div>
          <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
            <LockClosedRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
            <div>
              Garantir proteção e privacidade de dados sensíveis, em um sistema
              criptografado de ponta a ponta.
            </div>
          </div>
          <div className="grow-1" />
        </div>
      </div>
      <div className="bg-background text-logo-primary h-fit self-stretch flex flex-col items-center justify-center gap-6">
        <div className="text-2xl md:text-5xl p-4 md:p-8">
          <b>
            <i>Ledger:</i>
          </b>
          &nbsp;Registro Imutável
        </div>
        <div className="self-stretch flex flex-col md:flex-row items-stretch justify-center gap-3 h-fit mb-8 ml-8 mr-8 mt-2">
          <div className="flex-1  flex flex-col items-center p-2">
            <div className="text-2xl font-bold">I</div>
            <Image
              src={`${basePath}/ledger-step-I.svg`}
              width={350}
              height={433}
              alt="ledger passo 1"
            />
            <div className="sm:text-lg md:text-2xl mt-4">
              Faça upload do seu arquivo (seu ativo digital, ou documento
              digitalizado)
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center p-2">
            <div className="text-2xl font-bold">II</div>
            <Image
              src={`${basePath}/ledger-step-II.svg`}
              width={350}
              height={433}
              alt="ledger passo 2"
            />
            <div className="sm:text-lg md:text-2xl mt-4">
              Requeira o registro (<i>timestamp</i>) e receba um selo digital
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center p-2">
            <div className="text-2xl font-bold">III</div>
            <Image
              src={`${basePath}/ledger-step-III.svg`}
              width={350}
              height={433}
              alt="ledger passo 3"
            />
            <div className="sm:text-lg md:text-2xl mt-4">
              Recupere seu arquivo, regenere o selo e mostre-o registrado na
              Blockchain.
            </div>
          </div>
        </div>
      </div>
      <div className="bg-logo-primary h-114 min-h-114 self-stretch flex relative">
        <div
          className="grow-1 text-background"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(24, 42, 85, 0.8), rgba(24, 42, 85, 1)), url('${basePath}/c.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="grow-2 text-background"></div>
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-stretch justify-center text-background p-8">
          <div className="grow-1 md:mr-4 flex flex-col">
            <div className="text-logo-secondary self-stretch text-2xl md:text-5xl">
              Impactos Legais do Selo de Timestamp
            </div>
            <div className="grow-1" />
            <div className="self-stretch sm:text-lg md:text-2xl">
              O registro de ativos digitais na Blockchain possui valor jurídico,
              porque a Blockchain funciona cadastrando dados eletrônicamente por
              diversos nós de computação, testemunhas digitais da existência do
              documento em um determinado momento do tempo.
            </div>
            <div className="grow-1" />
          </div>
          <div className="self-stretch min-w-24 md:min-w-48 flex flex-col items-center justify-start">
            <Image
              src={`${basePath}/legal-impact.svg`}
              width={175}
              height={204}
              alt="ledger passo 3"
              className="hidden md:block"
            />
            <Image
              src={`${basePath}/legal-impact.svg`}
              width={100}
              height={116}
              alt="ledger passo 3"
              className="md:hidden"
            />
          </div>
        </div>
      </div>
      <div className="h-fit min-h-fit self-stretch flex flex-col justify-center p-8 md:pt-16 md:pb-16 md:pl-8 md:pr-8">
        <div className="bg-white p-8 rounded opacity-75 flex flex-col lg:flex-row">
          <div className="flex-1 lg:w-1/3 lg:min-w-1/3 flex items-center justify-center">
            <Image
              src={`${basePath}/architecture.webp`}
              width={600}
              height={600}
              alt="arquitetura segura"
            />
          </div>
          <div className="grow-1 md:mr-4 flex flex-col mt-4 lg:ml-4 text-logo-primary">
            <div
              id="environment"
              className="text-logo-secondary self-stretch text-2xl md:text-5xl mb-8 md:mb-16"
            >
              Arquitetura Técnica e Segurança
            </div>
            <div className="self-stretch text-lg md:text-2xl">
              A <b>Btoken</b> hospeda seus sistemas em um ambiente altamente
              seguro, com várias barreiras para inibir qualquer tipo de
              vazamento de dados ou entradas não autorizadas, com as seguintes
              características:
            </div>
            <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
              <StarRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
              <div>
                Toda comunicação externa e interna mediada por SSL, mantendo uma
                estrutura fechada.
              </div>
            </div>
            <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
              <StarRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
              <div>Todos os bancos de dados são totalmente encriptados.</div>
            </div>
            <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
              <StarRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
              <div>
                Os sistemas-operacionais são encriptados em memória, através de
                configurações de hardware.
              </div>
            </div>
            <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
              <StarRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
              <div>
                Dados em <i>cloud</i> possuem um segundo adicional de
                criptografia usuário a usuário.
              </div>
            </div>
            <div className="self-stretch sm:text-lg md:text-2xl ml-4 md:ml-16 flex items-center">
              <StarRegular className="text-5xl text-logo-secondary mr-4 min-w-16" />
              <div>
                Chaves de segurança armazenadas em <i>wallets offline</i>.
              </div>
            </div>
          </div>
        </div>
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
          <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-left text-background m-8 gap-2 md:gap-8">
            <div className="text-logo-secondary self-stretch text-2xl md:text-5xl">
              Parceria e Integrações:
            </div>
            <div className="grow-1" />
            <div className="self-stretch text-lg md:text-2xl">
              A <b>Btoken</b> não é apenas uma ferramenta de registro de
              documentos, nós também oferecemos uma{' '}
              <a className="font-bold" href="/docs">
                API completa
              </a>{' '}
              para que você possa integrar os seus sistemas a nós.
            </div>
            <div className="self-stretch text-lg md:text-2xl">
              Além disso, se você quiser, ativamente, promover nossas soluções,
              podemos abrir uma parceria comissionada, que permite a
              participação da sua empresa em novos negócios da <b>BToken</b>.
            </div>
            <div className="self-stretch text-lg md:text-2xl">
              <Link className="font-bold" href="/contact">
                Fale conosco!
              </Link>
            </div>
            <div className="grow-1" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
