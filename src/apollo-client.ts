import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from "@apollo/client"
import { useMemo } from "react"

let apolloClient: ApolloClient<NormalizedCacheObject>
const isProduction = process.env.NODE_ENV === "production"

const createApolloClient = () => {
  const uri = isProduction
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3001"

  const httpLink = new HttpLink({
    uri: typeof window === "undefined" ? `${uri}/api/graphql` : "/api/graphql",
  })

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    ssrMode: typeof window === "undefined",
  })
}

export const initializeApolllo = (initialState: any = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()

    _apolloClient.cache.restore({
      ...existingCache,
      ...initialState,
    })
  }

  if (typeof window === "undefined") return _apolloClient

  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApolllo(initialState), [initialState])
  return store
}
