import prisma from "@covid/server/prisma"
import { AppApiRequest } from "@covid/_app.interface"

import { NextApiResponse } from "next"
import { ListFeedResponse } from "@covid/service/feed.service"
import { send } from "process"

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
      take: parseInt(size as string, 10),
      include: {
        author: true,
        Likes: {
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

/**
 * 피드의 상세정보를 반환합니다.
 * @param id feed 의 id
 */
const get = async (req: AppApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const feed = await prisma.feed.findUnique({
    where: {
      id: parseInt(id as string, 10),
    },
    include: {
      author: true,
      Likes: true,
      Screps: true,
    },
  })

  return res.send(feed)
}

/**
 * 피드에 리액션 - 좋아요 를 추가합니다.
 */
const likes = async (req: AppApiRequest, res: NextApiResponse) => {
  const { feedId } = req.body
  const { user } = req

  if (!user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const likeFeed = await prisma.likes.create({
    data: {
      author: {
        connect: {
          id: user.id,
        },
      },
      feed: {
        connect: {
          id: parseInt(feedId as string, 10),
        },
      },
    },
  })

  const countOfFeedLikes = await prisma.likes.count({
    where: {
      feedId: parseInt(feedId as string, 10),
    },
  })

  await prisma.feed.update({
    data: {
      likes: countOfFeedLikes,
    },
    where: {
      id: parseInt(feedId as string, 10),
    },
  })

  return res.send({
    Likes: likeFeed,
    countOfFeedLikes,
  })
}

/**
 * 피드에 리액션 - 좋아요 를 삭제합니다.
 */
const unlikes = async (req: AppApiRequest, res: NextApiResponse) => {
  const { likeId, feedId } = req.body
  const { user } = req

  if (!user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  try {
    console.log("delete likeId", likeId)
    const deleted = await prisma.likes.delete({
      where: {
        id: likeId,
      },
    })
  } catch (e) {
    console.log("Delete Error", e)
  }

  console.log(">>>>>>>>>>>> countOfFeedLikes.... ")
  const countOfFeedLikes = await prisma.likes.count({
    where: {
      feedId: parseInt(feedId as string, 10),
    },
  })
  console.log(`>>>>>>>>>>>> countOfFeedLikes: ${countOfFeedLikes} `)

  console.log(">>>>>>>>>>>> update Feed.... ")
  await prisma.feed.update({
    data: {
      likes: countOfFeedLikes,
    },
    where: {
      id: feedId,
    },
  })

  return res.send({
    countOfFeedLikes,
  })
}

export default {
  create,
  list,
  get,
  likes,
  unlikes,
}
