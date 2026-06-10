'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { Input, Button, Spinner } from '@fluentui/react-components'
import Link from 'next/link'
import * as Yup from 'yup'
import { ptForm } from 'yup-locale-pt'

import { isPasswordStrong } from '@/util/Password'
import {
  registerUser,
  RegisterUserStatusT,
  UserListDataT,
  confirmRegistration,
} from '@/business/user'

Yup.setLocale(ptForm)

const loginValidationSchema = Yup.object({
  name: Yup.string().min(3, 'Mínimo de três caracteres').required(),
  email: Yup.string().email('Formato de e-mail inválido').required(),
  password: Yup.string()
    .required()
    .test('strongness', 'A senha precisa ser forte', (value) =>
      isPasswordStrong(value)
    ),
})

export default function Home() {
  const [wait, setWait] = useState(false)
  const loginFormik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async (values) => {
      setWait(false)
    },
    validationSchema: loginValidationSchema,
  })
  return (
    <div className="h-full flex flex-col justify-items justify-center">
      <form>
        <div className="flex flex-col items-center justify-center mt-8 mb-8">
          <div className="text-2xl">Login:</div>
          <div className="w-2/5 flex flex-row items-center gap-3 mt-4">
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
            <div className="w-4/5 text-red-500 text-bold">
              {loginFormik.errors.name}
            </div>
          ) : null}
          <div className="w-2/5 flex flex-row items-center gap-3 mt-4">
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
            <div className="w-4/5 text-red-500 text-bold">
              {loginFormik.errors.password}
            </div>
          ) : null}
          <div className="flex flex-row-reverse p-2 w-2/5 mt-4">
            <Button type="submit" appearance="primary" disabled={wait}>
              Registrar {wait && <Spinner />}
            </Button>
            <div className="mr-4">
              <Button onClick={() => history.back()} disabled={wait}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
