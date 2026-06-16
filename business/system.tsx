import { c } from '@/util/ClientHost'
import { UserDataT } from './user'

export interface UserResponseT {
  success: boolean
  userData?: Array<any>
  message?: string
}

export interface SimpleUserResponseT {
  success: boolean
  userData?: any
  message?: string
}

export async function loadAllUsers(): Promise<UserResponseT> {
  let a = {} as UserResponseT

  const response = await c({
    path: '/user-management/api/systemadmin/all_users',
    method: 'POST',
  })

  a.success = response.status >= 200 && response.status <= 299

  if (a.success) {
    a.userData = response.data
  } else {
    a.message = `Aconteceu algum problema: ${response.data.error}`
  }

  return a
}

export async function loadUserBalance(
  name: string
): Promise<SimpleUserResponseT> {
  let a = {} as SimpleUserResponseT

  const response = await c({
    path: `/financial-management/api/financial/usermanager/user/${name}/account/BRL/balance`,
    method: 'POST',
  })

  a.success = response.status >= 200 && response.status <= 299

  if (a.success) {
    a.userData = response.data
  } else {
    a.message = `Aconteceu algum problema: ${response.data.error}`
  }

  return a
}

export async function executeUserDeposit({
  name,
  value,
  description,
  currency = 'BRL',
}: {
  name: string
  value: Number
  description: string
  currency?: string
}): Promise<SimpleUserResponseT> {
  let a = {} as SimpleUserResponseT

  const response = await c({
    path: `/financial-management/api/financial/user/${name}/deposit`,
    method: 'PUT',
    body: {
      currency: currency,
      amount: value,
      description: description,
    },
  })

  a.success = response.status >= 200 && response.status <= 299

  if (a.success) {
    a.userData = response.data
  } else {
    a.message = `Aconteceu algum problema: ${response.data.error}`
  }

  return a
}
