'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ptForm } from 'yup-locale-pt'
import {
  Input,
  Button,
  Spinner,
  Checkbox,
  Select,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from '@fluentui/react-components'

import { registerFile, getMimeType, verifyFile } from '@/business/file'

Yup.setLocale(ptForm)

// Maximum size allowed:40MB (40 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 41943040

const fileRegisterValidationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required('Você precisa escolher um arquivo')
    .test('fileSize', 'O arquivo é muito grande (Max 4MB)', (value) => {
      if (!value) return true // Skip if no file (handled by required)
      return value.size <= MAX_FILE_SIZE
    }),
})

export default function Verification() {
  const [wait, setWait] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [signature, setSignature] = useState<any | null>(null)
  const [success, setSuccess] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const [copiedText, setCopiedText] = useState('')
  const [copiedTextType, setCopiedTextType] = useState('')
  const [isCopyOpen, setIsCopyOpen] = useState(false)

  const fileFormik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: async (values) => {
      setWait(true)

      const validation = await verifyFile(values.file!)

      if (validation.success) {
        setErrorMessage('')
        setSignature(validation.userData)
      } else {
        setErrorMessage(validation.message!)
        setSignature(null)
      }

      fileFormik.resetForm()
      setWait(false)

      // Clear file input form
      const element = document.getElementById('file') as HTMLInputElement
      if (element) {
        element.value = ''
      }
    },
    validationSchema: fileRegisterValidationSchema,
  })

  return (
    <div className="flex min-h-full flex-col w-dvw overflow-y-auto overflow-x-hidden">
      <div className="grow" />
      <form
        className="flex flex-col items-center justify-center mt-8 mb-8 min-h-fit w-dvw"
        onSubmit={fileFormik.handleSubmit}
      >
        <div className="text-2xl ml-4 mr-4">
          Verifique assinatura de arquivo:
        </div>
        {errorMessage != '' ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg text-red-500 mt-4">
            {errorMessage}
          </div>
        ) : null}
        {signature !== null ? (
          <div className="flex items-center md:items-stretch flex-col mb-4 w-full md:w-fit">
            <div className="text-lg font-bold md:w-2/3 mt-8">
              Assinatura digital:
            </div>
            <div className="md:hidden self-stretch pl-8 pr-4 md:pl-0 md:pr-0 md:w-2/3">
              <div className="font-bold mb-2">Nome</div>
              <div className="mb-4 overflow-x-auto">{signature?.name}</div>
              <div className="font-bold mb-2">Responsável</div>
              <div className="mb-4 overflow-x-auto">
                {signature?.owner_user_name}
              </div>
              <div className="font-bold mb-2">Nome Completo</div>
              <div className="mb-4 overflow-x-auto">
                {signature?.owner_masked_full_name}
              </div>
              <div className="font-bold mb-2">E-mail</div>
              <div className="mb-4 overflow-x-auto">
                {signature?.owner_masked_email}
              </div>
              <div className="font-bold mb-2">MD5-Sum</div>
              <div className="mb-4 overflow-x-auto">{signature?.md5}</div>
              <div className="font-bold mb-2">SHA2-Sum</div>
              <div className="mb-4 overflow-x-auto">{signature?.sha2}</div>
              <div className="font-bold mb-2">SHA3-Sum</div>
              <div className="mb-4 overflow-x-auto">{signature?.sha3}</div>
              <div className="font-bold mb-2">Transação</div>
              <div className="mb-4 overflow-x-auto">
                {signature?.transaction_hash}
              </div>
            </div>
            <table className="hidden md:table [&_td]:p-3 hidden md:table">
              <tbody>
                <tr>
                  <td className="font-bold">Nome</td>
                  <td>{signature?.name}</td>
                </tr>
                <tr>
                  <td className="font-bold">Responsável</td>
                  <td>{signature?.owner_user_name}</td>
                </tr>
                <tr>
                  <td className="font-bold">Nome Completo</td>
                  <td>{signature?.owner_masked_full_name}</td>
                </tr>
                <tr>
                  <td className="font-bold">E-mail</td>
                  <td>{signature?.owner_masked_email}</td>
                </tr>
                <tr>
                  <td className="font-bold">MD5-Sum</td>
                  <td>
                    <div className="w-80 overflow-auto">{signature?.md5}</div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">SHA2-Sum</td>
                  <td>
                    <div className="w-80 overflow-auto">{signature?.sha2}</div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">SHA3-Sum</td>
                  <td>
                    <div className="w-80 overflow-auto">{signature?.sha3}</div>
                  </td>
                </tr>
                <tr>
                  <td className="font-bold">Transação</td>
                  <td>
                    <div className="w-80 overflow-auto">
                      {signature?.transaction_hash}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <Dialog
              open={isCopyOpen}
              onOpenChange={(e, data) => {
                setCopiedText('')
                setCopiedTextType('')
                setIsCopyOpen(data.open)
              }}
              modalType="alert"
            >
              <DialogSurface>
                <DialogBody>
                  <DialogTitle>Atenção</DialogTitle>
                  <DialogContent>
                    {copiedTextType} foi copiado para a área de transferência.
                  </DialogContent>
                  <DialogActions>
                    <Button
                      appearance="primary"
                      onClick={() => {
                        setCopiedText('')
                        setCopiedTextType('')
                        setIsCopyOpen(false)
                      }}
                    >
                      Fechar
                    </Button>
                  </DialogActions>
                </DialogBody>
              </DialogSurface>
            </Dialog>
          </div>
        ) : null}
        {success ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg mt-4">
            {errorMessage !== '' ? (
              <div className="mb-4">Arquivo registrado com erros.</div>
            ) : (
              <div className="mb-4">Arquivo registrado com sucesso.</div>
            )}
            <div>Identificador de referência:</div>
            <div className="text-bold text-sm mb-4 w-80 overflow-auto flex items-center justify-center">
              {referenceId}
            </div>
            {transactionId !== '' ? (
              <>
                <div>Transação de Assinatura: </div>
                <div className="text-bold text-sm mb-4 w-80 overflow-auto flex items-center justify-center">
                  {transactionId}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        <div className="p-4 w-full sm:w-2/3 max-w-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 m-4 mb-0">
          <div className="mr-4 pl-4 sm:pl-0">Arquivo:</div>
          <input
            className="grow min-w-0 ml-4 cursor-pointer border border-gray-300 rounded p-1"
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null
              const fileName = file?.name || ''
              const mimeType = getMimeType(fileName)
              fileFormik.setFieldValue('file', file)
              fileFormik.setFieldValue('fileType', mimeType)
              fileFormik.setFieldValue('fileName', fileName)
            }}
            disabled={wait}
          />
        </div>
        {fileFormik.touched.file && fileFormik.errors.file ? (
          <div className="w-4/5 md:w-2/5 text-red-500 text-bold">
            {fileFormik.errors.file}
          </div>
        ) : null}
        <div className="w-4/5 flex flex-row-reverse p-2 w-fit md:w-2/5 mt-4">
          <Button type="submit" appearance="primary" disabled={wait}>
            Submeter {wait && <Spinner size="tiny" />}
          </Button>
          <div className="mr-4">
            <Button
              onClick={() => {
                fileFormik.resetForm()
                setSuccess(false)
                setErrorMessage('')
                setSignature(null)

                // Clear file input form
                const element = document.getElementById(
                  'file'
                ) as HTMLInputElement
                if (element) {
                  element.value = ''
                }
              }}
              disabled={wait}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
      <div className="grow" />
    </div>
  )
}
