import { NextApiRequest, NextComponentType } from "next"
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

export type AppApiRequest = NextApiRequest & {
  user?: User | null
}
