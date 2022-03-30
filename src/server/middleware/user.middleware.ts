import prisma from "@covid/server/prisma"
import { NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import { NextHandler } from "next-connect"
import { User } from "@prisma/client"
import { AppApiRequest } from "@covid/_app.interface"

const userMiddleware = async (
  req: AppApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  const session = await getSession({ req })

  let user: User | null = null

  if (session) {
    user = await prisma.user.findFirst({
      where: {
        id: (session.user as any).id,
      },
    })
  }

  req.user = user

  next()
}

export default userMiddleware
