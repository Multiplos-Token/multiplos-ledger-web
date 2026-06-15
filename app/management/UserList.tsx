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
} from '@fluentui/react-components'
import { MoneyRegular } from '@fluentui/react-icons'

export default function UserList() {
  const [open, setOpen] = useState(false)
  const restoreFocusTargetAttribute = useRestoreFocusTarget()

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
                <Button
                  icon={
                    <MoneyRegular
                      {...restoreFocusTargetAttribute}
                      onClick={() => {
                        // it is the user responsibility to open the dialog
                        setOpen(true)
                      }}
                    />
                  }
                />
              </Tooltip>
            </td>
          </tr>
          <tr>
            <td className="pb-2">Paulo</td>
            <td className="pb-2">psfilho@gmail.com</td>
            <td className="pb-2">RG:50.490.790-6</td>
            <td className="pb-2 cursor-pointer underline">Consultar...</td>
            <td className="pb-2">
              <Tooltip content="Registrar Depósito" relationship="label">
                <Button
                  icon={
                    <MoneyRegular
                      {...restoreFocusTargetAttribute}
                      onClick={() => {
                        // it is the user responsibility to open the dialog
                        setOpen(true)
                      }}
                    />
                  }
                />
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </table>
      <Dialog
        // this controls the dialog open state
        open={open}
        onOpenChange={(event, data) => {
          // it is the users responsibility to react accordingly to the open state change
          setOpen(data.open)
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              exercitationem cumque repellendus eaque est dolor eius expedita
              nulla ullam? Tenetur reprehenderit aut voluptatum impedit
              voluptates in natus iure cumque eaque?
            </DialogContent>
            <DialogActions>
              <Button appearance="primary">Do Something</Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  )
}
