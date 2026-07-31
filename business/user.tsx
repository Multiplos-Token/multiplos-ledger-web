import { c, h, logoff } from '@/util/ClientHost'

export interface UserDataT {
  name: string
  email: string
  password: string
  passwordRepeat: string
  firstName: string
  lastName: string
  completeName: string
  phoneNumber: string
  legalIdentification: string
  countryIso2: string
  title: string
  documentType: string
}

export interface EnrichmentT {
  name: string
  email: string
  password: string
  first_name: string
  last_name: string
  complete_name: string
  phone_number: string
  legal_identification: string
  country_iso2: string
  title: string
  document_type: string
}
export interface UserListDataT {
  name: string
  default_ether_account: string
  enrichment?: EnrichmentT
}

export interface RegisterUserStatusT {
  success: boolean
  message: string
}

export interface UserCredentialsT {
  name: string
  password: string
}

export interface UserStatusResponseT {
  success: boolean
  value?: any
}

export interface UserInfoT {
  name: string
  password: string
  email: string
  first_name: string
  last_name: string
  complete_name: string
  title: string
  phone_number: string
  country_iso2: string
  legal_identification: string
  default_ether_account: string
  status: string
}

export interface UserFinancialsT {
  description: string
  balance: number
  date: string
  movement_value: number
}

export async function registerUser(
  userData: UserDataT
): Promise<RegisterUserStatusT> {
  let a = {} as RegisterUserStatusT
  try {
    const response = await c({
      path: '/user-management/api/user/register',
      method: 'PUT',
      body: {
        name: userData.name,
        password: userData.password,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        complete_name: userData.completeName,
        title: userData.title,
        phone_number: userData.phoneNumber,
        country_iso2: userData.countryIso2,
        legal_identification: `${userData.documentType}:${userData.legalIdentification}`,
      },
    })

    a.success = response.status < 300

    if (a.success) {
      // TODO: Change treatment here - only first leg of registration has been done!!!!
      a.message = 'Primeira etapa de registro de usuário finalizada.'
    } else {
      a.message = 'Usuário não pôde ser registrado. Tente novamente.'
    }

    try {
      if (
        response.data.registration_id &&
        response.data.registration_id != ''
      ) {
        console.log('Debug registration id:', response.data.registration_id)
      }
    } catch {}
  } catch (e) {
    a.success = false
    a.message = `Erro: ${e}. Tente novamente.`
  }
  return a
}

export async function confirmRegistration(
  email: string,
  code: string,
  currencyIso: string
): Promise<RegisterUserStatusT> {
  let a = {} as RegisterUserStatusT
  try {
    const response = await c({
      path: '/financial-management/api/financial/user/confirm_registration',
      method: 'PUT',
      body: {
        email: email,
        code: code,
        account_currency_iso: currencyIso,
      },
    })

    a.success = response.status < 300

    if (a.success) {
      a.message = 'Usuário registrado com sucesso'
    } else {
      a.message = `Erro: ${response.data.error}`
    }
  } catch (e) {
    a.success = false
    a.message = `Erro: ${e}. Tente novamente.`
  }
  return a
}

export async function userLogin(
  credentials: UserCredentialsT
): Promise<RegisterUserStatusT> {
  let a = {} as RegisterUserStatusT
  const response = await fetch(h('/b2f/api/user/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })

  a.success = response.status >= 200 && response.status <= 299
  if (a.success) {
    a.message = 'Usuário logado com sucesso.'
  } else {
    a.message = 'Login falhou. Tente novamente.'
  }

  return a
}

export async function userLogoff() {
  const response = await fetch(h('/b2f/api/user/logoff'), { method: 'POST' })
}

export async function userStatus(): Promise<UserStatusResponseT> {
  let u = { success: false } as UserStatusResponseT

  const response = await fetch(h('/b2f/api/user/session_status'), {
    method: 'POST',
  })

  if (response.status == 401) {
    await logoff()
    return u
  }

  u.value = await response.json()

  if (response.status >= 200 && response.status <= 299) {
    u.success = true
    // Only user info is relevant - any other data can be ignored:
    u.value = u.value.user_info
  }

  return u
}

export async function verifyUserSystemManager(): Promise<boolean> {
  const statusResponse = await userStatus()
  if (statusResponse.success !== true) {
    return false
  }

  const response = await c({
    path: `/user-management/api/systemadmin/user/${statusResponse.value.name}/permission/system_admin`,
    method: 'POST',
    onUnauthorizedLogoff: false,
  })

  return response.status === 204
}

export async function userFinancials({
  userName,
}: {
  userName: string
}): Promise<UserStatusResponseT> {
  const u = { success: false } as UserStatusResponseT

  const response = await c({
    path: `/financial-management/api/financial/user/${userName}/account/BRL/statement`,
    method: 'POST',
  })

  if (response.status >= 200 && response.status <= 299) {
    u.success = true
    // Only user info is relevant - any other data can be ignored:
    u.value = response.data
  }

  return u
}
