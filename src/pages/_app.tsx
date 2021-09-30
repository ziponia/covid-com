import PageLayout from "@covid/templates/PageLayout"
import {
  AppCombineProps,
  AppPageProps,
  defaultAppProps,
} from "@covid/_app.interface"
import "antd/dist/antd.css"
import { NextComponentType } from "next"
import { Provider as AuthProvider } from "next-auth/client"
import React from "react"
import { RecoilRoot } from "recoil"
import "../styles/global.scss"

const App: NextComponentType<AppPageProps> = ({
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

App.getInitialProps = async ({ Component, ctx }: any) => {
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
