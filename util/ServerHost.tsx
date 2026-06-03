import { cookies } from 'next/headers'

export function a(route: string): string {
  const addr = process.env.BTOKEN_UIM_ADDRESS ?? 'http://localhost:8080'
  return addr + route
}

export function h(path: string) {
  const host = process?.env?.NEXT_PUBLIC_HOST_PATH || ''
  return host + path
}

export async function isLogged(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.has('btoken_access_token')
}
