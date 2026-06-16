'use client'

import { useState } from 'react'
import {
  Button,
  Tooltip,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  useRestoreFocusTarget,
  Input,
  Spinner,
} from '@fluentui/react-components'
import { MoneyRegular } from '@fluentui/react-icons'

import { loadUserBalance } from '@/business/system'

export default function UserList({ data }: { data: Array<any> }) {
  const [users, setUsers] = useState(data)
  const [open, setOpen] = useState(false)
  const [currentDialogUserName, setCurrentDialogUserName] = useState<
    string | null
  >(null)
  const [depositValue, setDepositValue] = useState('')
  const [depositValueError, setDepositValueError] = useState('')
  const [depositDescription, setDepositDescription] = useState('')
  const [depositSubmitting, setDepositSubmitting] = useState(false)

  const restoreFocusTargetAttribute = useRestoreFocusTarget()
  const formatterBRL = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
  })

  const verifyValueFormat = (v: string): boolean => {
    const reg = /^\d+,\d{2}$/g
    return v.match(reg) !== null && parseFloat(v.replaceAll(',', '.')) != 0
  }

  return (
    <div className="flex grow flex-col items-stretch">
      <table className="m-4">
        <thead className="font-bold">
          <tr>
            <th className="pb-2">Nome</th>
            <th className="pb-2">E-mail</th>
            <th className="pb-2">País</th>
            <th className="pb-2">Identificação</th>
            <th className="pb-2">Balanço</th>
            <th className="pb-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            return users.map((d, i) => {
              return (
                <tr key={i}>
                  <td className="pb-2">{d.name}</td>
                  <td className="pb-2">{d.email}</td>
                  <td className="pb-2">{d.country_iso2}</td>
                  <td className="pb-2">{d.legal_identification}</td>
                  <td
                    className="pb-2 cursor-pointer underline"
                    onClick={async () => {
                      const response = await loadUserBalance(d.name)
                      let newUsers = JSON.parse(JSON.stringify(users))
                      if (response.success) {
                        newUsers[i].balance = response.userData!.balance
                        newUsers[i].account_error = ''
                      } else {
                        newUsers[i].balance = 0
                        newUsers[i].account_error = response.message!
                      }
                      setUsers(newUsers)
                    }}
                  >
                    {typeof d.balance !== 'undefined' ? (
                      <span>{formatterBRL.format(d.balance / 100)}</span>
                    ) : (
                      <span>Consultar...</span>
                    )}
                  </td>
                  <td className="pb-2">
                    <Tooltip content="Registrar Depósito" relationship="label">
                      <Button
                        icon={<MoneyRegular />}
                        {...restoreFocusTargetAttribute}
                        onClick={() => {
                          // it is the user responsibility to open the dialog
                          setCurrentDialogUserName(d.name)
                          setOpen(true)
                        }}
                        disabled={d.account_error !== ''}
                      />
                    </Tooltip>
                  </td>
                </tr>
              )
            })
          })()}
        </tbody>
      </table>
      <Dialog
        // this controls the dialog open state
        open={open}
        onOpenChange={(event, data) => {
          // it is the users responsibility to react accordingly to the open state change
          if (!depositSubmitting) {
            setOpen(data.open)
            setCurrentDialogUserName(null)
            setDepositValue('')
            setDepositDescription('')
          }
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Registro de Depósito</DialogTitle>
            <DialogContent>
              <div className="flex m-2">
                <div className="font-bold mr-2 flex items-center">
                  Valor (R$):
                </div>
                <div>
                  <Input
                    disabled={depositSubmitting}
                    value={depositValue}
                    onChange={(ev, data) => {
                      if (!verifyValueFormat(data.value)) {
                        setDepositValueError(
                          'Use o formato: 0,00. Coloque um valor diferente de zero.'
                        )
                      } else {
                        setDepositValueError('')
                      }
                      setDepositValue(data.value)
                    }}
                  />
                </div>
              </div>
              {depositValueError !== '' ? (
                <div className="flex m-2 flex items-center text-red-500">
                  {depositValueError}
                </div>
              ) : null}
              <div className="flex m-2 flex items-center">
                <div className="font-bold mr-2">Descrição:</div>
                <div>
                  <Input
                    disabled={depositSubmitting}
                    value={depositDescription}
                    onChange={(ev, data) => setDepositDescription(data.value)}
                  />
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="primary"
                disabled={depositSubmitting || depositValueError !== ''}
              >
                Submeter{depositSubmitting ? <Spinner size="tiny" /> : null}
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" disabled={depositSubmitting}>
                  Fechar
                </Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  )
}
