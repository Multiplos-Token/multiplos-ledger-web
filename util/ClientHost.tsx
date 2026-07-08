'use client'

import { CallRequestBody, CallResponseData } from '@/util/Call'

export function h(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  return basePath + path
}

export async function logoff() {
  await fetch(h('/b2f/api/user/logoff'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  window.location.replace(h('/'))
}

// Standard function calling backend and automatically logging off on 401 Unauthorized error
export async function c({
  path,
  method = 'GET',
  body = undefined,
  onUnauthorizedLogoff = true,
}: {
  path: string
  method?: string
  body?: any
  onUnauthorizedLogoff?: boolean
}): Promise<CallResponseData> {
  let response = await fetch(h('/b2f/call'), {
    method: 'POST',
    body: JSON.stringify({
      route: path,
      method: method,
      body: body,
    }),
  })

  const responseBody = JSON.parse(await response.text()) as CallResponseData

  if (onUnauthorizedLogoff === true && responseBody.status == 401) {
    await logoff()
  }

  return responseBody
}
