import { a } from '@/util/ServerHost'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('btoken_access_token')?.value || ''

  const response = await fetch(a('/api/user/logoff'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  // In any case delete access token (if logoff has failed, the old token will be expired soon!):
  cookieStore.delete('btoken_access_token')

  if (!response.ok) {
    return Response.json(
      { error: 'Failed to logoff' },
      { status: response.status }
    )
  }

  return new NextResponse(null, { status: 204 })
}
