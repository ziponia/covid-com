import React from "react"
import { NextComponentType } from "next"
import {
  AppContextType,
  AppInitialProps,
} from "next/dist/next-server/lib/utils"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { RecoilRoot } from "recoil"
import { Provider as AuthProvider } from "next-auth/client"
import { defaultAppProps } from "../_app.interface"

import PageLayout from "../templates/PageLayout"

import "antd/dist/antd.css"
import "../styles/global.scss"

const App: NextComponentType<AppContextType, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: any) => {
  const Layout = Component.Layout ? Component.Layout : PageLayout
  console.log("pageProps", pageProps)
  return (
    <RecoilRoot>
      <AuthProvider session={pageProps.session}>
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </RecoilRoot>
  )
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = defaultAppProps

  if (Component.getInitialProps) {
    pageProps = {
      ...pageProps,
      ...(await Component.getInitialProps(ctx)),
    }
  }

  return { pageProps }
}

export default App
