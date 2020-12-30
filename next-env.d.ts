/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="./src/index" />

import { NextComponentType } from "next"

export type AppLayoutProps = {
  pageTitle?: string
  pageSubTitle?: string
}

export type AppCombineProps = AppLayoutProps

export type AppPageProps<T = {}> = NextComponentType<
  T,
  AppCombineProps,
  T & AppCombineProps
>
