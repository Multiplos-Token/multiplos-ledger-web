'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { Input, Button, Spinner } from '@fluentui/react-components'
import * as Yup from 'yup'
import { ptForm } from 'yup-locale-pt'

import { isPasswordStrong } from '@/util/Password'
import {
  registerUser,
  RegisterUserStatusT,
  UserListDataT,
  confirmRegistration,
  userLogin,
} from '@/business/user'

Yup.setLocale(ptForm)

const loginValidationSchema = Yup.object({
  name: Yup.string().min(3, 'Mínimo de três caracteres').required(),
  password: Yup.string()
    .required()
    .test('strongness', 'A senha precisa ser forte', (value) =>
      isPasswordStrong(value)
    ),
})

export default function Home() {
  const router = useRouter()

  const [wait, setWait] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const loginFormik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async (values) => {
      setWait(true)
      console.log('Login values: ', values)
      const status = await userLogin(values)
      setWait(false)
      if (status.success) {
        router.push('/enduser')
      } else {
        setErrorMessage(status.message)
      }
    },
    validationSchema: loginValidationSchema,
  })
  return (
    <div className="flex flex-col h-dvh w-dvw overflow-y-auto overflow-x-hidden">
      <div className="grow" />
      <form
        className="flex flex-col items-center justify-center mt-8 mb-8 min-h-fit w-dvw"
        onSubmit={loginFormik.handleSubmit}
      >
        <div className="text-2xl">Login:</div>
        {errorMessage != '' ? (
          <div className="w-4/5 flex flex-col items-center justify-center text-bold text-lg text-red-500 mt-4">
            {errorMessage}
          </div>
        ) : null}
        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4 mb-0">
          <div className="w-1/3">Nome de Usuário:</div>
          <Input
            className="grow min-w-0"
            id="name"
            name="name"
            type="text"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.name}
            disabled={wait}
          />
        </div>
        {loginFormik.touched.name && loginFormik.errors.name ? (
          <div className="w-4/5 md:w-2/5 text-red-500 text-bold">
            {loginFormik.errors.name}
          </div>
        ) : null}
        <div className="w-4/5 md:w-2/5 flex flex-row items-center gap-3 m-4">
          <div className="w-1/3">Senha:</div>
          <Input
            className="grow min-w-0"
            id="password"
            name="password"
            type="password"
            onChange={loginFormik.handleChange}
            value={loginFormik.values.password}
            disabled={wait}
          />
        </div>
        {loginFormik.touched.password && loginFormik.errors.password ? (
          <div className="w-4/5 md:w-2/5 text-red-500 text-bold">
            {loginFormik.errors.password}
          </div>
        ) : null}
        <div className="flex flex-row-reverse p-2 w-fit md:w-2/5 mt-4">
          <Button type="submit" appearance="primary" disabled={wait}>
            Entrar {wait && <Spinner size="tiny" />}
          </Button>
          <div className="mr-4">
            <Button onClick={() => history.back()} disabled={wait}>
              Cancelar
            </Button>
          </div>
        </div>
      </form>
      <div className="grow" />
    </div>
  )
}
