/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="./src/index" />

import { NextComponentType } from "next"
import { GetProviderResponse } from "next-auth"

export type AppLayoutProps = {
  pageTitle?: string
  pageSubTitle?: string
}

export type AppAuthProps = {
  providers?: GetProviderResponse
}

export type AppCombineProps = AppLayoutProps & AppAuthProps

export type AppPageProps<T = {}> = NextComponentType<
  T,
  AppCombineProps,
  T & AppCombineProps
>
