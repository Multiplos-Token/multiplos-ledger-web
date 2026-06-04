import { c, h } from '@/util/ClientHost'

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

export async function registerUser(
  userData: UserDataT
): Promise<RegisterUserStatusT> {
  let a = {} as RegisterUserStatusT
  try {
    const response = await c({
      path: '/api/usermanager/register_user',
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
      a.message = 'Usuário registrado com sucesso.'
    } else {
      a.message =
        'Usuário não pôde ser registrado. Verifique se ele já não foi registrado previamente e tente novamente.'
    }
  } catch (e) {
    a.success = false
    a.message = `Erro desconhecido: ${e}. Tente novamente.`
  }
  return a
}

export async function listUsers(): Promise<Array<UserListDataT>> {
  let res = [] as Array<UserListDataT>
  try {
    const response = await c({
      path: '/api/usermanager/list_users?enrich=true',
      method: 'POST',
    })
    res = (response.data ?? []) as Array<UserListDataT>
  } catch (e) {}
  return res
}

export async function listUsersByName(
  name: string
): Promise<Array<UserListDataT>> {
  let res = [] as Array<UserListDataT>
  try {
    const response = await c({
      path: `/api/usermanager/list_users/${name}?enrich=true`,
      method: 'POST',
    })
    res = (response.data ?? []) as Array<UserListDataT>
  } catch (e) {}
  return res
}
