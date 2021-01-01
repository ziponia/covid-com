import React from "react"
import { NextApiRequest, NextComponentType, NextPageContext } from "next"
import { users as User } from "@prisma/client"

export type AppLayoutProps = {
  pageTitle?: string
  pageSubTitle?: string
  header?: boolean
}

export type AppAuthProps = {
  providers?: any
}

export type AppCombineProps = AppLayoutProps & AppAuthProps

export type AppPageProps<T = {}> = NextComponentType<
  NextPageContext,
  AppCombineProps & T,
  AppCombineProps & T
> & {
  Layout?: React.FC<AppLayoutProps>
}

export const defaultAppProps: AppLayoutProps = {
  pageTitle: "Covid Com",
  header: true,
}

export type AppApiRequest = NextApiRequest & {
  user?: User | null
}
