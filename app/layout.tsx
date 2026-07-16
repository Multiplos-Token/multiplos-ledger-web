import type { Metadata } from 'next'

// 👇 import the providers
import { Providers, rubik } from './providers'

// Import the styles
import './globals.css'

export const metadata: Metadata = {
  title: 'BToken',
  description: 'BToken Ledget Timestamp',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${rubik.className} antialiased`}>
      <body className={rubik.className}>
        <Providers>
          <div className="h-dvh w-dvw">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
