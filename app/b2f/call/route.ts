import { CallRequestBody, CallResponseData } from '@/util/Call'
import { a } from '@/util/ServerHost'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body: CallRequestBody = await request.json()
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('btoken_access_token')?.value || ''

  const response = await fetch(a(body.route), {
    method: body.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body.body ? JSON.stringify(body.body) : undefined,
  })

  const cr: CallResponseData = {
    status: response.status,
    data: JSON.parse(await response.text()),
  }

  return Response.json(cr, { status: 200 })
}
