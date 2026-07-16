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
  createLightTheme,
  createDarkTheme,
  Theme,
  BrandVariants,
} from '@fluentui/react-components'
import { useServerInsertedHTML } from 'next/navigation'

import { AntdRegistry } from '@ant-design/nextjs-registry'
import { ConfigProvider } from 'antd'

export const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const btokenTheme: BrandVariants = {
  10: '#020206',
  20: '#111627',
  30: '#162446',
  40: '#1F2F59',
  50: '#2E3B63',
  60: '#3D476E',
  70: '#4C5479',
  80: '#5A6284',
  90: '#696F8F',
  100: '#787D9A',
  110: '#878BA5',
  120: '#969AB1',
  130: '#A5A8BC',
  140: '#B5B7C8',
  150: '#C4C6D4',
  160: '#D4D6DF',
}

const lightTheme: Theme = {
  ...createLightTheme(btokenTheme),
  fontFamilyBase: '"Rubik", ui-sans-serif, system-ui, sans-serif',
}

const darkTheme: Theme = {
  ...createDarkTheme(btokenTheme),
  fontFamilyBase: '"Rubik", ui-sans-serif, system-ui, sans-serif',
}

darkTheme.colorBrandForeground1 = btokenTheme[110]
darkTheme.colorBrandForeground2 = btokenTheme[120]

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
        <FluentProvider theme={lightTheme}>
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
