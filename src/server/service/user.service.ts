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

  const updateUserInfo = await prisma.user.update({
    where: {
      id: req.user?.id,
    },
    data: {
      name,
    },
  })

  return res.send(updateUserInfo)
}

const updateUserImage = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const { image } = req.body

  const updateImage = await prisma.user.update({
    where: {
      id: req.user?.id,
    },
    data: {
      image,
    },
  })
  return res.send(updateImage)
}

export default {
  update,
  updateUserImage,
}
