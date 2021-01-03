/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="./src/index" />

import "next-auth"

declare module "next-auth/client" {
  export interface Session {
    user: {
      createdAt?: string
      updatedAt?: string
      email?: string
      emailVerified?: string
      id: number
      image?: string
      name?: string
    }
  }
}
