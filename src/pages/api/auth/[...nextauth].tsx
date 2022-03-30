import { PrismaClient, User } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import NextAuth, { NextAuthOptions } from "next-auth"
import KakaoProvider from "next-auth/providers/kakao"
import Adapters from "next-auth/adapters"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

// import prisma from "@covid/lib/prisma"

let prisma

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    ;(global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

const options: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],

  // A database is optional, but required to persist accounts in a database
  adapter: PrismaAdapter(prisma),

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
  // session: {
  //   jwt: true,
  // },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      return Promise.resolve(token)
    },
    session: async ({ session, user }) => {
      session.user = {
        ...session.user,
        ...user,
      }
      return Promise.resolve(session)
    },
  },
  // debug: process.env.NODE_ENV !== "production",
  debug: false,
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
