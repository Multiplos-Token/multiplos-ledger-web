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
  code: string
): Promise<RegisterUserStatusT> {
  let a = {} as RegisterUserStatusT
  try {
    const response = await c({
      path: '/financial-management/api/financial/user/confirm_registration',
      method: 'PUT',
      body: {
        email: email,
        code: code,
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
