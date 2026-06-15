'use client'

import { Button, Tooltip } from '@fluentui/react-components'
import { MoneyRegular } from '@fluentui/react-icons'

export default function UserList() {
  return (
    <div className="flex grow flex-col">
      <table className="w-full m-4">
        <thead className="font-bold">
          <tr>
            <th className="pb-2">Nome</th>
            <th className="pb-2">E-mail</th>
            <th className="pb-2">Identificação</th>
            <th className="pb-2">Balanço</th>
            <th className="pb-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pb-2">Paulo</td>
            <td className="pb-2">psfilho@gmail.com</td>
            <td className="pb-2">RG:50.490.790-6</td>
            <td className="pb-2 cursor-pointer underline">Consultar...</td>
            <td className="pb-2">
              <Tooltip content="Registrar Depósito" relationship="label">
                <Button icon={<MoneyRegular />} />
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td colSpan={5}>Cala a boca, VTNC</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
