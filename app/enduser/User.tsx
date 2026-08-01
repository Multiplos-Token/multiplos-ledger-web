'use client'

import { useState, useEffect } from 'react'
import { Button, Spinner } from '@fluentui/react-components'
import { ArrowExitRegular } from '@fluentui/react-icons'
import {
  userLogoff,
  userStatus,
  UserInfoT,
  UserFinancialsT,
  userFinancials,
} from '@/business/user'
import { useRouter } from 'next/navigation'

export default function Files() {
  const router = useRouter()
  const [loggingOff, setLoggingOff] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<null | UserInfoT>(null)
  const [financials, setFinancials] = useState<Array<UserFinancialsT>>([])

  const loadData = async () => {
    // Load user data in background....
    let status = await userStatus()

    if (status.success) {
      const uinfo = status.value as UserInfoT
      setUserInfo(uinfo)
      let financials = await userFinancials({ userName: uinfo.name })
      if (financials.success) {
        setFinancials(financials.value!)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // Forces 24-hour format
  })
  const curFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return (
    <div className="w-9/10 md:w-4/5 min-h-full flex flex-col">
      <div className="grow-1 flex mt-4">
        {loading ? (
          <div className="grow flex items-center justify-center">
            Carregando dados de usuário... &nbsp; <Spinner />
          </div>
        ) : (
          <div className="grow flex flex-col min-w-0 w-full">
            <div className="text-2xl">Dados Pessoais:</div>
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
      {loading ? (
        <div className="grow flex items-center justify-center">
          Carregando dados financeiros... &nbsp; <Spinner />
        </div>
      ) : (
        <div className="w-9/10 md:w-4/5 min-h-full grow-2 flex justify-center mt-8">
          <div className="w-full">
            <div className="text-2xl">Dados Financeiros:</div>
            {financials.length == 0 ? (
              <div>Você não tem operações financeiras.</div>
            ) : (
              <>
                <div className="md:hidden">
                  {financials.toReversed().map((v, i) => {
                    return (
                      <div
                        key={i}
                        style={{
                          marginTop: i == 0 ? '1rem' : '0.5rem',
                        }}
                      >
                        <div className="font-bold">Data</div>
                        <div
                          style={{
                            color: v.movement_value < 0 ? 'red' : undefined,
                          }}
                        >
                          {dateFormatter.format(new Date(v.date))}
                        </div>
                        <div className="font-bold">Saldo Atual</div>
                        <div
                          style={{
                            color: v.movement_value < 0 ? 'red' : undefined,
                          }}
                        >
                          {curFormatter.format(v.balance / 100)}
                        </div>
                        <div className="font-bold">Descrição</div>
                        <div
                          style={{
                            color: v.movement_value < 0 ? 'red' : undefined,
                          }}
                        >
                          {v.description}
                        </div>
                        <div className="font-bold">Valor (BRL)</div>
                        <div
                          style={{
                            color: v.movement_value < 0 ? 'red' : undefined,
                          }}
                        >
                          {curFormatter.format(v.movement_value / 100)}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <table className="hidden md:table w-full mt-4">
                  <thead>
                    <tr>
                      <th className="pb-2 pr-2">Data</th>
                      <th className="pb-2 pr-2 whitespace-nowrap">
                        Saldo Atual
                      </th>
                      <th className="pb-2 pr-2">Descrição</th>
                      <th className="pb-2 whitespace-nowrap">Valor (BRL)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financials.toReversed().map((v, i) => {
                      return (
                        <tr
                          key={i}
                          style={{
                            color: v.movement_value < 0 ? 'red' : undefined,
                          }}
                        >
                          <td className="pb-2 pr-2 whitespace-nowrap">
                            {dateFormatter.format(new Date(v.date))}
                          </td>
                          <td className="pb-2 pr-2 ">
                            {curFormatter.format(v.balance / 100)}
                          </td>
                          <td className="pb-2 pr-2 ">{v.description}</td>
                          <td className="pb-2">
                            {curFormatter.format(v.movement_value / 100)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      )}
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
