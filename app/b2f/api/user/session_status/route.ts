import { cookies } from 'next/headers'
import { a } from '@/util/ServerHost'

interface UserInfoData {
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
}

interface SessionStatusResponseData {
  is_logged_in: boolean
  access_token?: string
  user_info?: UserInfoData
  error?: string
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('btoken_access_token')?.value || ''

  const response = await fetch(a('/user-management/api/user/info'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const r: SessionStatusResponseData = {
      is_logged_in: false,
      error: 'Failed to fetch session status',
    }
    return Response.json(r, { status: response.status })
  }
  // Get current user status, including if he/she is logged in or not
  const uinfo: UserInfoData = await response.json()
  const r: SessionStatusResponseData = {
    is_logged_in: true,
    access_token: accessToken,
    user_info: uinfo,
  }
  return Response.json(r)
}
