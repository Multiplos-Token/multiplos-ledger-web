'use client'

import * as React from 'react'
import { Rubik } from 'next/font/google'
import {
  FluentProvider,
  teamsLightTheme,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
} from '@fluentui/react-components'
import { useServerInsertedHTML } from 'next/navigation'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

export const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const customTeamsLight = {
  ...teamsLightTheme,
  fontFamilyBase: '"Rubik", ui-sans-serif, system-ui, sans-serif',
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = React.useState(() => createDOMRenderer())
  const didRenderRef = React.useRef(false)

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return
    }
    didRenderRef.current = true
    return <>{renderToStyleElements(renderer)}</>
  })

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={customTeamsLight}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#5a6284',
                  colorInfo: '#5a6284',
                  colorTextBase: '#5a6284',
                  fontFamily: '"Rubik", ui-sans-serif, system-ui, sans-serif',
                },
              }}
            >
              {children}
            </ConfigProvider>
          </AntdRegistry>
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  )
}
