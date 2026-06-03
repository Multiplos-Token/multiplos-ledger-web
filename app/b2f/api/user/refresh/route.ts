import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('btoken_access_token')?.value || ''

  const response = await fetch(`${process.env.BTOKEN_UIM_ADDRESS}/api/user/refresh`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    return Response.json({ error: 'Failed to refresh token' }, { status: response.status })
  }

  return new NextResponse(null, { status: 204 })
}
