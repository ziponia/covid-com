import prisma from "@covid/server/prisma"
import { AppApiRequest } from "@covid/_app.interface"
import Joi from "joi"

import { NextApiResponse } from "next"

/**
 * 피드를 검색하여 리스트를 출력합니다.
 */
const feedList = async (req: AppApiRequest, res: NextApiResponse) => {
  const { cursor, size = "20", authorId, page, searchText } = req.query

  const _searchText = searchText as string
  const _cursor = cursor ? parseInt(cursor as string, 10) : -1
  const _page = page ? parseInt(page as string, 10) : -1

  try {
    const totalElements = await prisma.feed.count()
    const lastFeed = await prisma.feed.findFirst({
      orderBy: {
        id: "desc",
      },
      distinct: "id",
    })
    const feeds = await prisma.feed.findMany({
      cursor: {
        id: _cursor < 0 ? lastFeed?.id : _cursor,
      },
      orderBy: {
        id: "desc",
      },
      skip: _page > -1 ? _page * 10 : undefined,
      take: parseInt(size as string, 10),
      where: {
        OR: [
          {
            title: {
              contains: _searchText,
            },
          },
          {
            content: {
              contains: _searchText,
            },
          },
        ],
      },
      include: {
        author: true,
        Likes: {
          distinct: "id",
          where: {
            authorId: req.user?.id,
          },
        },
        Screps: {
          distinct: "id",
          where: {
            authorId: req.user?.id,
          },
        },
      },
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
  feedList,
}
