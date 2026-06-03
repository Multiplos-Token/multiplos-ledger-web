import { a } from '@/util/ServerHost'
import { cookies } from 'next/headers'
interface LoginRequestBody {
  name: string
  password: string
}

interface LoginResponseData {
  access_token: string
}

export async function POST(request: Request) {
  const body: LoginRequestBody = await request.json()
  const response = await fetch(a('/api/user/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    return Response.json({ error: 'Login failed' }, { status: response.status })
  }

  const data: LoginResponseData = await response.json()
  const cookieStore = await cookies()
  cookieStore.set({
    name: 'btoken_access_token',
    value: data.access_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })

  return Response.json(data)
}
