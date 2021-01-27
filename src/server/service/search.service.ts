import prisma from "@covid/server/prisma"
import { AppApiRequest } from "@covid/_app.interface"
import Joi from "joi"

import { NextApiResponse } from "next"

/**
 * 피드를 검색하여 리스트를 출력합니다.
 */
const feedList = async (req: AppApiRequest, res: NextApiResponse) => {
  const { cursor, size = "5", page, q } = req.query

  console.log(cursor)

  const _searchText = q as string
  const _cursor = cursor ? parseInt(cursor as string, 10) : -1
  const _page = page ? parseInt(page as string, 10) : -1

  try {
    const totalElements = await prisma.feed.count({
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
    })
    const _skip = () => {
      if (_cursor > -1) return 1
      return _page > -1 ? _page * 10 : undefined
    }
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
      skip: _skip(),
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
      },
    })
    return res.send({
      meta: {
        totalElements,
        cursor: feeds.length > 0 ? feeds[feeds.length - 1].id : undefined,
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
