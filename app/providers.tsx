'use client'

import * as React from 'react'
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
        <FluentProvider theme={teamsLightTheme}>
          <AntdRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#5a6284',
                  colorInfo: '#5a6284',
                  colorTextBase: '#5a6284',
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
