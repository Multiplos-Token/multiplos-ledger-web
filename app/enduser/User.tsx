'use client'

import { useState, useEffect } from 'react'
import { Button, Spinner } from '@fluentui/react-components'
import { ArrowExitRegular } from '@fluentui/react-icons'
import {
  userLogoff,
  userStatus,
  UserInfoT,
  userFinancials,
} from '@/business/user'
import { useRouter } from 'next/navigation'

export default function Files() {
  const router = useRouter()
  const [loggingOff, setLoggingOff] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<null | UserInfoT>(null)

  const loadData = async () => {
    // Load user data in background....
    let status = await userStatus()
    let financials = await userFinancials()
    if (status.success && financials.success) {
      setUserInfo(status.value)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="w-9/10 md:w-4/5 min-h-full flex flex-col">
      <div className="grow-1 flex mt-4">
        {loading ? (
          <div className="flex items-center justify-center">
            Carregando dados de usuário... &nbsp; <Spinner />
          </div>
        ) : (
          <div className="grow flex flex-col min-w-0 w-full">
            <div className="text-2xl">Dados de Usuário:</div>
            <table className="w-full hidden md:table mt-4">
              <tbody>
                <tr className="w-full">
                  <td>Nome:</td>
                  <td className="font-bold">{userInfo?.name}</td>
                </tr>
                <tr className="w-full">
                  <td>Senha:</td>
                  <td className="font-bold">{userInfo?.password}</td>
                </tr>
                <tr className="w-full">
                  <td>E-mail:</td>
                  <td className="font-bold">{userInfo?.email.toLowerCase()}</td>
                </tr>
                <tr className="w-full">
                  <td>Primeiro Nome:</td>
                  <td className="font-bold">{userInfo?.first_name}</td>
                </tr>
                <tr className="w-full">
                  <td>Último Nome (Sobrenome):</td>
                  <td className="font-bold">{userInfo?.last_name}</td>
                </tr>
                <tr className="w-full">
                  <td>Nome Completo:</td>
                  <td className="font-bold">{userInfo?.complete_name}</td>
                </tr>
                <tr className="w-full">
                  <td>Título:</td>
                  <td className="font-bold">{userInfo?.title}</td>
                </tr>
                <tr className="w-full">
                  <td>Telefone:</td>
                  <td className="font-bold">{userInfo?.phone_number}</td>
                </tr>
                <tr className="w-full">
                  <td>Código de País:</td>
                  <td className="font-bold">
                    {userInfo?.country_iso2.toUpperCase()}
                  </td>
                </tr>
                <tr className="w-full">
                  <td>Documento de Identificação:</td>
                  <td className="font-bold">
                    {userInfo?.legal_identification.toUpperCase()}
                  </td>
                </tr>
                <tr className="w-full">
                  <td>Endereço Ethereum:</td>
                  <td className="font-bold">
                    {userInfo?.default_ether_account}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="md:hidden mt-4 w-full min-w-0 flex flex-col">
              <div>Nome:</div>
              <div className="font-bold overflow-x-auto">{userInfo?.name}</div>
              <div>Senha:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.password}
              </div>
              <div>E-mail:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.email.toLowerCase()}
              </div>
              <div>Primeiro Nome:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.first_name}
              </div>
              <div className="overflow-x-auto">Último Nome (Sobrenome):</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.last_name}
              </div>
              <div>Nome Completo:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.complete_name}
              </div>
              <div>Título:</div>
              <div className="font-bold overflow-x-auto">{userInfo?.title}</div>
              <div>Telefone:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.phone_number}
              </div>
              <div>Código de País:</div>
              <div className="font-bold">
                {userInfo?.country_iso2.toUpperCase()}
              </div>
              <div className="overflow-x-auto">Documento de Identificação:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.legal_identification.toUpperCase()}
              </div>
              <div>Endereço Ethereum:</div>
              <div className="font-bold overflow-x-auto">
                {userInfo?.default_ether_account}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grow-2 flex items-center justify-center">
        {loading ? (
          <div>
            Carregando dados financeiros... &nbsp; <Spinner />
          </div>
        ) : (
          <div className="text-red-500">
            Dados financeiros (implementar depois de ter o registro de
            documento)
          </div>
        )}
      </div>
      <div className="flex flex-row-reverse mb-4">
        <Button
          icon={<ArrowExitRegular />}
          onClick={async () => {
            await userLogoff()
            router.push('/')
          }}
          appearance="subtle"
          disabled={loggingOff}
        >
          Logoff {loggingOff ? <Spinner size="tiny" /> : null}
        </Button>
      </div>
    </div>
  )
}
