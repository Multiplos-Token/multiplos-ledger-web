'use client'

import { useState } from 'react'
import { useFormik } from 'formik'
import { Input, Select, Button, Spinner } from '@fluentui/react-components'
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

const loginValidationSchema = Yup.object({})

export default function Home() {
  const [wait, setWait] = useState(false)
  const loginFormik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      setWait(false)
    },
    validationSchema: loginValidationSchema,
  })
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <form className="flex flex-col items-center justify-center mt-8 mb-8">
        <div className="w-1/3">Nome de Usuário:</div>
        <div className="grow min-w-0">
          <Input
            className="w-full min-w-0"
            id="name"
            name="name"
            type="text"
            onChange={() => console.log('Nothing')}
            value={loginFormik.values.name}
            disabled={wait}
          />
        </div>
      </form>
    </div>
  )
}
