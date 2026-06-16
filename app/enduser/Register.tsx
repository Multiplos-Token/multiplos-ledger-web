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

import { registerFile, getMimeType } from '@/business/file'

Yup.setLocale(ptForm)

// Maximum size allowed:4MB (4 * 1024 * 1024 bytes)
const MAX_FILE_SIZE = 4194304

const fileRegisterValidationSchema = Yup.object({
  file: Yup.mixed<File>()
    .required('Você precisa escolher um arquivo')
    .test('fileSize', 'O arquivo é muito grande (Max 4MB)', (value) => {
      if (!value) return true // Skip if no file (handled by required)
      return value.size <= MAX_FILE_SIZE
    }),
  fileName: Yup.string().required(),
  fileType: Yup.string().required(),
})

export default function Files() {
  const [wait, setWait] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [defaultRegister, setDefaultRegister] = useState<boolean | 'mixed'>(
    false
  )
  const [publish, setPublish] = useState<boolean | 'mixed'>(false)
  const [referenceId, setReferenceId] = useState('')
  const [transactionId, setTransactionId] = useState('')

  const fileFormik = useFormik({
    initialValues: {
      file: null,
      fileName: '',
      fileType: '',
    },
    onSubmit: async (values) => {
      setWait(true)

      const registerResponse = await registerFile({
        name: values.fileName,
        file: values.file!,
        type: values.fileType,
        autoSign: defaultRegister === true,
        publicSign: publish === true,
      })

      setSuccess(registerResponse.success)
      if (registerResponse.success) {
        setReferenceId(registerResponse.fileData!.referenceId)
        if (
          registerResponse.fileData!.transactionId &&
          registerResponse.fileData!.transactionId !== ''
        ) {
          setTransactionId(registerResponse.fileData!.transactionId)
        }
      }

      if (registerResponse.message) {
        setErrorMessage(registerResponse.message)
      }

      fileFormik.resetForm()
      setWait(false)
      setDefaultRegister(false)
      setPublish(false)

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
        <div className="text-2xl">Registre arquivo:</div>
        {errorMessage != '' ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg text-red-500 mt-4">
            {errorMessage}
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
        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4 mb-0">
          <div className="w-1/3">Arquivo:</div>
          <input
            className="grow min-w-0 ml-4 cursor-pointer"
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
          <div className="w-1/3">Tipo de arquivo:</div>
          <Select
            className="grow min-w-0"
            id="fileType"
            name="fileType"
            value={fileFormik.values.fileType}
            onChange={fileFormik.handleChange}
          >
            <option value="">-- Selecione um tipo de arquivo --</option>
            <optgroup label="Documentos de Escritório (MS Office)">
              <option value="application/pdf">Documento PDF</option>
              <option value="application/msword">
                Microsoft Word (Antigo)
              </option>
              <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                Microsoft Word Documento
              </option>
              <option value="application/vnd.ms-excel">
                Microsoft Excel Planilha (Antigo)
              </option>
              <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
                Microsoft Excel Planilha
              </option>
              <option value="application/vnd.ms-powerpoint">
                Microsoft PowerPoint Apresentação (Antigo)
              </option>
              <option value="application/vnd.openxmlformats-officedocument.presentationml.presentation">
                Microsoft PowerPoint Apresentação
              </option>
              <option value="application/rtf">
                Formato de Texto Rico (RTF)
              </option>
            </optgroup>
            <optgroup label="Formatos OpenDocument">
              <option value="application/vnd.oasis.opendocument.text">
                Texto OpenDocument (ODT)
              </option>
              <option value="application/vnd.oasis.opendocument.spreadsheet">
                Planilha OpenDocument (ODS)
              </option>
              <option value="application/vnd.oasis.opendocument.presentation">
                Apresentação OpenDocument (ODP)
              </option>
              <option value="application/vnd.oasis.opendocument.graphics">
                Desenho OpenDocument (ODG)
              </option>
            </optgroup>
            <optgroup label="Livros Digitais (E-Books)">
              <option value="application/epub+zip">Livro Digital EPUB</option>
              <option value="application/x-mobipocket-ebook">
                Livro Digital Mobipocket
              </option>
              <option value="application/vnd.amazon.mobi8-ebook">
                Livro Digital Kindle (AZW3)
              </option>
              <option value="application/x-cbz">
                História em Quadrinhos Digital (CBZ)
              </option>
            </optgroup>
            <optgroup label="Imagens">
              <option value="image/apng">
                APNG (Gráficos de Rede Portáteis Animados)
              </option>
              <option value="image/avif">Formato de Imagem AV1 (AVIF)</option>
              <option value="image/gif">
                GIF (Formato de Intercâmbio de Gráficos)
              </option>
              <option value="image/jpeg">Imagem JPEG</option>
              <option value="image/png">
                PNG (Gráficos de Rede Portáteis)
              </option>
              <option value="image/svg+xml">
                SVG (Gráficos Vetoriais Escalonáveis)
              </option>
              <option value="image/webp">Formato de Imagem WebP</option>
              <option value="image/x-icon">Ícone de Computador (ICO)</option>
            </optgroup>
            <optgroup label="Áudio & Vídeo">
              <option value="video/mp4">Vídeo MP4</option>
              <option value="video/webm">Vídeo WebM</option>
              <option value="video/ogg">Vídeo Ogg</option>
              <option value="audio/mpeg">Áudio MP3</option>
              <option value="audio/wav">Áudio Waveform (WAV)</option>
              <option value="audio/ogg">Áudio Ogg</option>
              <option value="audio/webm">Áudio WebM</option>
              <option value="audio/aac">
                Áudio AAC (Advanced Audio Coding)
              </option>
            </optgroup>
            <optgroup label="Dados Estruturados">
              <option value="text/csv">
                Valores Separados por Vírgula (CSV)
              </option>
              <option value="text/calendar">
                Formato de Calendário iCalendar (ICS)
              </option>
              <option value="application/yaml">Configuração YAML</option>
              <option value="application/ld+json">Metadados JSON-LD</option>
            </optgroup>
            <optgroup label="Arquivos Compactados e Arquivos de Extensão">
              <option value="application/zip">Arquivo Compactado ZIP</option>
              <option value="application/x-7z-compressed">
                Arquivo Compactado 7-Zip
              </option>
              <option value="application/x-tar">
                Arquivo de Fita Tarball (TAR)
              </option>
              <option value="application/vnd.rar">
                Arquivo Compactado RAR
              </option>
            </optgroup>
            <optgroup label="Código Fonte e Texto">
              <option value="text/plain">Texto Puro (TXT)</option>
              <option value="text/markdown">Documentação Markdown</option>
              <option value="application/x-sh">Script Shell Bourne (SH)</option>
              <option value="application/php">Arquivo de Código PHP</option>
            </optgroup>
            <optgroup label="Documentos Web">
              <option value="text/html">
                HTML (Linguagem de Marcação de Hipertexto)
              </option>
              <option value="text/css">
                CSS (Folhas de Estilo em Cascata)
              </option>
              <option value="text/javascript">Código Fonte JavaScript</option>
              <option value="application/json">Dados JSON</option>
              <option value="application/manifest+json">
                Manifesto de Aplicativo Web
              </option>
              <option value="application/xhtml+xml">
                XHTML (Extensible HTML)
              </option>
              <option value="application/xml">Dados XML</option>
            </optgroup>
            <optgroup label="Fontes de Texto">
              <option value="font/woff">WOFF (Web Open Font Format)</option>
              <option value="font/woff2">
                WOFF 2.0 (Web Open Font Format 2.0)
              </option>
              <option value="font/ttf">Fonte TrueType (TTF)</option>
              <option value="font/otf">Fonte OpenType (OTF)</option>
            </optgroup>
            <optgroup label="Arquivo não classificado">
              <option value="application/octet-stream">
                Arquivo binário não classificado
              </option>
            </optgroup>
          </Select>
        </div>
        {fileFormik.touched.fileType && fileFormik.errors.fileType ? (
          <div className="w-4/5 md:w-2/5 text-red-500 text-bold">
            {fileFormik.errors.fileType}
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
        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4 mb-0">
          <div className="w-1/3">Publicar:</div>
          <div className="grow">
            <Checkbox
              checked={publish}
              onChange={(ev, data) => {
                setPublish(data.checked)
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
                setPublish(false)
                setSuccess(false)

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
