import { PrismaClient, users } from "@prisma/client"
import { NextApiResponse } from "next"
import NextAuth, { InitOptions } from "next-auth"
import Adapters from "next-auth/adapters"
import { NextApiRequest } from "next-auth/_utils"
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

const options: InitOptions = {
  // Configure one or more authentication providers
  providers: [
    {
      id: "kakao",
      name: "Kakao",
      type: "oauth",
      version: "2.0",
      // scope:
      //   "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
      params: { grant_type: "authorization_code" },
      accessTokenUrl: "https://kauth.kakao.com/oauth/token",
      // requestTokenUrl: "https://accounts.google.com/o/oauth2/auth",
      authorizationUrl:
        "https://kauth.kakao.com/oauth/authorize?response_type=code",
      profileUrl: "https://kapi.kakao.com/v2/user/me",
      profile: (profile: any) => {
        return {
          id: profile.id,
          name: profile.kakao_account.profile.nickname,
          // email: profile.kakao_account.email,
          image: profile.kakao_account.profile.profile_image_url,
        }
      },
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    },
  ],

  // A database is optional, but required to persist accounts in a database
  database: process.env.DATABASE_URL,
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
    jwt: async (token, user, account, profile, isNewUser) => {
      return Promise.resolve(token)
    },
    session: async (session, user) => {
      session.user = {
        ...session.user,
        ...user,
      }
      return Promise.resolve(session)
    },
  },
  debug: process.env.NODE_ENV !== "production",
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
