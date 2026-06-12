'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ptForm } from 'yup-locale-pt'
import { Input, Button, Spinner, Checkbox } from '@fluentui/react-components'

Yup.setLocale(ptForm)

// Maximum size allowed:4MB (4 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 4194304

const fileRegisterValidationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required('Você precisa escolher um arquivo')
    .test('fileSize', 'O arquivo é muito grande (Max 4MB)', (value) => {
      if (!value) return true // Skip if no file (handled by required)
      console.log('Validating file: ', value)
      console.log('File size: ', value.size)
      console.log('File is file?', value instanceof File)
      return value.size <= MAX_FILE_SIZE
    }),
  fileName: Yup.string().required(),
})

export default function Files() {
  const [wait, setWait] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [defaultRegister, setDefaultRegister] = useState<boolean | 'mixed'>(
    false
  )

  const fileFormik = useFormik({
    initialValues: {
      file: null,
      fileName: '',
    },
    onSubmit: async (values) => {
      setWait(true)
      setTimeout(() => {
        fileFormik.resetForm()
        setWait(false)
        setSuccess(true)
      }, 1000)
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
        <div className="text-2xl">Registre arquivo:</div>
        {errorMessage != '' ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg text-red-500 mt-4">
            {errorMessage}
          </div>
        ) : null}
        {success ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg mt-4">
            <div className="mb-4">Arquivo registrado com sucesso.</div>
            <div>Identificador de referência:</div>
            <div className="text-bold text-sm mb-4">
              fdhjsfdhsjdhfkjsdfhjksfkdfdksjhfdkjs
            </div>
            <div>Transação de Assinatura: </div>
            <div className="text-bold text-sm mb-4">
              0x50170c2188f63cb0b8b0959d5e6a4490e1f442b5137bb608ac34c19574855e7a
            </div>
          </div>
        ) : null}

        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4 mb-0">
          <div className="w-1/3">Nome:</div>
          <Input
            className="grow min-w-0"
            id="fileName"
            name="fileName"
            type="text"
            onChange={fileFormik.handleChange}
            value={fileFormik.values.fileName}
            disabled={wait}
          />
        </div>
        {fileFormik.touched.fileName && fileFormik.errors.fileName ? (
          <div className="w-4/5 md:w-2/5 text-red-500 text-bold">
            {fileFormik.errors.fileName}
          </div>
        ) : null}
        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4 mb-0">
          <div className="w-1/3">Arquivo:</div>
          <input
            className="grow min-w-0 ml-4 cursor-pointer"
            id="file"
            name="file"
            type="file"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] || null
              fileFormik.setFieldValue('file', file)
            }}
            disabled={wait}
          />
        </div>
        {fileFormik.touched.file && fileFormik.errors.file ? (
          <div className="w-4/5 md:w-2/5 text-red-500 text-bold">
            {fileFormik.errors.file}
          </div>
        ) : null}
        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4 mb-0">
          <div className="w-1/3">Assinar:</div>
          <div className="grow">
            <Checkbox
              checked={defaultRegister}
              onChange={(ev, data) => {
                setDefaultRegister(data.checked)
              }}
              disabled={wait}
            />
          </div>
        </div>
        <div className="flex flex-row-reverse p-2 w-fit md:w-2/5 mt-4">
          <Button type="submit" appearance="primary" disabled={wait}>
            Submeter {wait && <Spinner size="tiny" />}
          </Button>
          <div className="mr-4">
            <Button
              onClick={() => {
                fileFormik.resetForm()
                setDefaultRegister(false)
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
