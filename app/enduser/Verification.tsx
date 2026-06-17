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
          <div className="flex items-stretch flex-col mb-4">
            <div className="text-lg font-bold">Assinatura digital:</div>
            <table>
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
        <div className="flex flex-row items-center justify-center gap-3 m-4 mb-0">
          <div className="mr-4">Arquivo:</div>
          <input
            className="min-w-0 ml-4 cursor-pointer"
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
