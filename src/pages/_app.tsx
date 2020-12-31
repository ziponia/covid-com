import React from "react"
import { NextComponentType } from "next"
import {
  AppContextType,
  AppInitialProps,
} from "next/dist/next-server/lib/utils"
import { AppProps } from "next/dist/next-server/lib/router/router"
import { RecoilRoot } from "recoil"
import { Provider as AuthProvider } from "next-auth/client"
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client"

import { AppCombineProps, defaultAppProps } from "../_app.interface"
import PageLayout from "../templates/PageLayout"
import { initializeApolllo, useApollo } from "../apollo-client"
import * as queries from "../graphql/query"

import "antd/dist/antd.css"
import "../styles/global.scss"

const App: NextComponentType<AppContextType, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}: any) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const Layout = Component.Layout || PageLayout

  return (
    <ApolloProvider client={apolloClient}>
      <RecoilRoot>
        <AuthProvider session={pageProps.session}>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </RecoilRoot>
    </ApolloProvider>
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

  // SSR
  if (typeof window === "undefined") {
    const apollo = initializeApolllo()

    await apollo.query({
      query: queries.INITIAL_QUERY,
    })

    pageProps.initialApolloState = apollo.cache.extract() as NormalizedCacheObject
  }

  return { pageProps }
}

export default App
