import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/client"
import prisma from "../../../lib/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const session = await getSession({ req })
    console.log("session", session?.user)
    return res.send({
      createDt: "20202020",
    })
  }
  return res.send({})
}

export default handler
