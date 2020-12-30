import { NextComponentType } from "next"
import { ReactNode } from "react"
import PageLayout from "./templates/PageLayout"

export type AppLayoutProps = {
  pageTitle?: string
  pageSubTitle?: string
  sidebar?: boolean
  header?: boolean
}

export type AppAuthProps = {
  providers?: any
}

export type AppCombineProps = AppLayoutProps & AppAuthProps

export type AppPageProps<T = {}> = NextComponentType<
  T,
  AppCombineProps,
  T & AppCombineProps
> & {
  Layout?: React.FC<AppLayoutProps>
}

export const defaultAppProps: AppLayoutProps = {
  sidebar: true,
  pageTitle: "Covid Com",
  header: true,
}
