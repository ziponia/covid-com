import prisma from "@covid/lib/prisma"
import { NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import { NextHandler } from "next-connect"
import { users } from "@prisma/client"
import { AppApiRequest } from "@covid/_app.interface"

const userMiddleware = async (
  req: AppApiRequest,
  res: NextApiResponse,
  next: NextHandler,
) => {
  console.log("user.middleware")

  const session = await getSession({ req })

  let user: users | null = null

  if (session) {
    user = await prisma.users.findFirst({
      where: {
        id: (session.user as any).id,
      },
    })
  }

  req.user = user

  next()
}

export default userMiddleware
