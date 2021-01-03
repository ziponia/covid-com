import React from "react"
import { NextComponentType } from "next"
import {
  AppContextType,
  AppInitialProps,
} from "next/dist/next-server/lib/utils"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { RecoilRoot } from "recoil"
import { Provider as AuthProvider } from "next-auth/client"

import { AppCombineProps, defaultAppProps } from "@covid/_app.interface"
import PageLayout from "@covid/templates/PageLayout"

import "antd/dist/antd.css"
import "../styles/global.scss"

const App: NextComponentType<AppContextType, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: any) => {
  const Layout = Component.Layout || PageLayout

  return (
    <AuthProvider session={pageProps.session}>
      <RecoilRoot>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </AuthProvider>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps: AppCombineProps = defaultAppProps

  if (Component.getInitialProps) {
    pageProps = {
      ...pageProps,
      ...(await Component.getInitialProps(ctx)),
    }
  }

  return { pageProps }
}

export default App
