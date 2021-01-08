import prisma from "@covid/server/prisma"
import { AppApiRequest } from "@covid/_app.interface"
import Joi from "joi"

import { NextApiResponse } from "next"

/**
 * 유저의 정보를 수정합니디.
 */
const update = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const { name } = req.body

  const updateUserInfo = await prisma.users.update({
    where: {
      id: req.user?.id,
    },
    data: {
      name,
    },
  })
  return res.send(updateUserInfo)
}

export default {
  update,
}
