import React from "react"
import { NextComponentType } from "next"
import {
  AppContextType,
  AppInitialProps,
} from "next/dist/next-server/lib/utils"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { RecoilRoot } from "recoil"

import PageLayout from "../templates/PageLayout"

import "antd/dist/antd.css"
import "../styles/global.scss"

const App: NextComponentType<AppContextType, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: any) => {
  return (
    <RecoilRoot>
      <PageLayout {...pageProps}>
        <Component {...pageProps} />
      </PageLayout>
    </RecoilRoot>
  )
}

export default App
