'use client'

import { useState, useEffect } from 'react'
import { listUserFiles, loadFileInfo } from '@/business/file'
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
import { DocumentRegular } from '@fluentui/react-icons'

export default function Files() {
  const restoreFocusTargetAttribute = useRestoreFocusTarget()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fileData, setFileData] = useState<Array<any>>([])
  const [currentFile, setCurrentFile] = useState<any | null>(null)

  const executeLoading = async () => {
    const files = await listUserFiles()
    if (files.success) {
      setFileData(files.userData as Array<any>)
    }
    setLoading(false)
  }

  useEffect(() => {
    executeLoading()
  }, [])

  if (loading) {
    return (
      <div className="flex grow justify-center items-center">Carregando...</div>
    )
  }

  const loadFileData = async (f: any) => {
    const finfo = await loadFileInfo(f.reference_id)
    setCurrentFile(f)
    setOpen(true)
  }

  return (
    <div className="flex grow flex-col items-stretch">
      <table className="m-4">
        <thead className="font-bold">
          <tr>
            <th className="pb-2">Nome</th>
            <th className="pb-2">Tipo (mime)</th>
            <th className="pb-2">Publicado</th>
            <th className="pb-2">Id de Referência</th>
            <th className="pb-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            return fileData.map((v, i) => {
              return (
                <tr key={i}>
                  <td className="pb-2">{v.name}</td>
                  <td className="pb-2">{v.mime_type}</td>
                  <td className="pb-2">{v.public ? 'sim' : 'não'}</td>
                  <td className="pb-2">
                    <div className="truncate w-80">{v.reference_id}</div>
                  </td>
                  <td className="pb-2">
                    <Tooltip content="Detalhes do Arquivo" relationship="label">
                      <Button
                        icon={<DocumentRegular />}
                        {...restoreFocusTargetAttribute}
                        onClick={() => {
                          loadFileData(v)
                        }}
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
          setOpen(data.open)
          setCurrentFile(null)
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Detalhes do Arquivo</DialogTitle>
            <DialogContent>
              <div className="flex flex-col items-stretch mb-8">
                <div className="font-bold">Identificador de Referência:</div>
                <div className="w-full overflow-auto">
                  {currentFile?.reference_id}
                </div>
              </div>
              <div className="flex">
                <div className="flex grow flex-col items-stretch mb-8">
                  <div className="font-bold">Nome:</div>
                  <div className="w-full overflow-auto">
                    {currentFile?.name}
                  </div>
                </div>
                <div className="flex grow flex-col items-stretch mb-8">
                  <div className="font-bold">Tipo (mime):</div>
                  <div className="w-full overflow-auto">
                    {currentFile?.mime_type}
                  </div>
                </div>
                <div className="flex grow flex-col items-stretch mb-8">
                  <div className="font-bold">Publicado:</div>
                  <div className="w-full overflow-auto">
                    {currentFile?.public ? 'sim' : 'não'}
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                appearance="primary"
                disabled={false}
                onClick={async () => {
                  setOpen(false)
                  setCurrentFile(null)
                }}
              >
                Assinar!{false ? <Spinner size="tiny" /> : null}
              </Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary" disabled={false}>
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
