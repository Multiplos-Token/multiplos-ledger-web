import { c } from '@/util/ClientHost'
import { UserDataT } from './user'

export interface UserResponseT {
  success: boolean
  userData?: Array<any>
  message: string
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
