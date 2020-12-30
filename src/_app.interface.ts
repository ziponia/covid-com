import { NextComponentType } from "next"

export type AppLayoutProps = {
  pageTitle?: string
  pageSubTitle?: string
  sidebar?: boolean
}

export type AppAuthProps = {
  providers?: any
}

export type AppCombineProps = AppLayoutProps & AppAuthProps

export type AppPageProps<T = {}> = NextComponentType<
  T,
  AppCombineProps,
  T & AppCombineProps
>

export const defaultAppProps: AppLayoutProps = {
  sidebar: true,
  pageTitle: "Covid Com",
  // pageSubTitle: 'Covid Com'
}
