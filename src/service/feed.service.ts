import prisma from "@covid/lib/prisma"
import { AppApiRequest } from "@covid/_app.interface"

import { NextApiResponse } from "next"

const create = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const { title, content } = req.body

  console.log("req.body", typeof req.body)
  console.log("create feed [title]", title)
  console.log("create feed [content]", content)
  const newFeed = await prisma.feed.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: req.user.id,
        },
      },
    },
  })
  return res.send(newFeed)
}

export default {
  create,
}
