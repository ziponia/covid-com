import prisma from "@covid/lib/prisma"
import { AppApiRequest } from "@covid/_app.interface"

import { NextApiResponse } from "next"

/**
 * 피드를 생성합니다.
 */
const create = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const { title, content } = req.body

  console.log("create feed [title]", title)
  console.log("create feed [content]", prisma)
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

/**
 * 피드 리스트를 출력합니다.
 */
const list = async (req: AppApiRequest, res: NextApiResponse) => {
  const { cursor, size = "20" } = req.query

  const _cursor = cursor ? parseInt(cursor as string, 10) : -1

  try {
    console.log("typeof: ", typeof prisma.feed)
    const totalElements = 0
    const lastFeed = await prisma.feed.findFirst({
      orderBy: {
        id: "desc",
      },
      distinct: "id",
    })

    console.log("lastFeedId", lastFeed)
    const feeds = await prisma.feed.findMany({
      cursor: {
        id: lastFeed?.id,
      },
      orderBy: {
        id: "desc",
      },
      take: parseInt(size as string, 10),
    })
    return res.send({
      meta: {
        totalElements,
      },
      items: feeds,
    })
  } catch (e) {
    console.error(e)
    return res.send(e)
  }
}

export default {
  create,
  list,
}
