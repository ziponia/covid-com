import { NormalizedCacheObject } from "@apollo/client"
import { NextComponentType } from "next"

export type AppLayoutProps = {
  pageTitle?: string
  pageSubTitle?: string
  header?: boolean
}

export type AppAuthProps = {
  providers?: any
}

export type AppApolloProps = {
  initialApolloState?: NormalizedCacheObject
}

export type AppCombineProps = AppLayoutProps & AppAuthProps & AppApolloProps

export type AppPageProps<T = {}> = NextComponentType<
  T,
  AppCombineProps,
  T & AppCombineProps
> & {
  Layout?: React.FC<AppLayoutProps>
}

export const defaultAppProps: AppLayoutProps = {
  pageTitle: "Covid Com",
  header: true,
}
