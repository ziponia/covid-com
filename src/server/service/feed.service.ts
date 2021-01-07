import prisma from "@covid/server/prisma"
import { AppApiRequest } from "@covid/_app.interface"
import Joi from "joi"

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

/**
 * 피드의 상세정보를 반환합니다.
 * @param id feed 의 id
 */
const get = async (req: AppApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  const { user } = req

  const logged = !!user

  const feed = await prisma.feed.findUnique({
    where: {
      id: parseInt(id as string, 10),
    },
    include: {
      author: true,
      Likes: {
        where: {
          authorId: logged ? user?.id : -1,
        },
      },
      Screps: {
        where: {
          authorId: logged ? user?.id : -1,
        },
      },
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

  try {
    const likeFeed = await prisma.likes.create({
      data: {
        author: {
          connect: {
            id: user.id,
          },
        },
        feed: {
          connect: {
            id: feedId,
          },
        },
      },
    })

    const countOfFeedLikes = await prisma.likes.count({
      where: {
        feedId,
      },
    })

    await prisma.feed.update({
      data: {
        likes: countOfFeedLikes,
      },
      where: {
        id: feedId,
      },
    })

    return res.send({
      Likes: likeFeed,
      countOfFeedLikes,
    })
  } catch (e) {
    return res.status(500).send(e.message)
  }
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
    const deleted = await prisma.likes.delete({
      where: {
        id: likeId,
      },
    })
  } catch (e) {
    console.log("Delete Error", e)
  }

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
      id: feedId,
    },
  })

  return res.send({
    countOfFeedLikes,
  })
}

/**
 * 피드를 스크랩 합니다.
 */
const screps = async (req: AppApiRequest, res: NextApiResponse) => {
  const { feedId } = req.body
  const { user } = req

  if (!user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const screpFeed = await prisma.screps.create({
    data: {
      author: {
        connect: {
          id: user.id,
        },
      },
      feed: {
        connect: {
          id: feedId,
        },
      },
    },
  })

  const countOfFeedScreps = await prisma.screps.count({
    where: {
      feedId,
    },
  })

  await prisma.feed.update({
    data: {
      screps: countOfFeedScreps,
    },
    where: {
      id: feedId,
    },
  })

  return res.send({
    Screps: screpFeed,
    countOfFeedScreps,
  })
}

/**
 * 피드에 리액션 - 좋아요 를 삭제합니다.
 */
const unscreps = async (req: AppApiRequest, res: NextApiResponse) => {
  const { screpId, feedId } = req.body
  const { user } = req

  if (!user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  try {
    const deleted = await prisma.screps.delete({
      where: {
        id: screpId,
      },
    })
  } catch (e) {
    console.log("Delete Error", e)
  }

  const countOfFeedScreps = await prisma.screps.count({
    where: {
      feedId: parseInt(feedId as string, 10),
    },
  })

  await prisma.feed.update({
    data: {
      screps: countOfFeedScreps,
    },
    where: {
      id: feedId,
    },
  })

  return res.send({
    countOfFeedScreps,
  })
}

/**
 * 피드를 삭제합니다.
 */
const remove = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const schema = Joi.object({
    feedId: Joi.number().required(),
  })

  try {
    const validate = await schema.validateAsync(req.body)
    // check my feed
    const prevFeed = await prisma.feed.findUnique({
      where: {
        id: validate.feedId,
      },
      select: {
        authorId: true,
      },
    })

    if (!prevFeed) {
      return res.status(404).send({
        message: `${validate.feedId} is not found`,
      })
    }

    if (prevFeed.authorId !== req.user.id) {
      return res.status(403).send({
        message: `${validate.feedId} is not found`,
      })
    }

    const removeFeed = await prisma.$queryRaw`
      delete from Feed where id = ${validate.feedId}
    `

    return res.status(200).send({
      message: "success",
    })
  } catch (e) {
    console.error(e)
    return res.status(400).send(e.details)
  } finally {
  }
}

const update = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const schema = Joi.object({
    content: Joi.string().required(),
    title: Joi.string().required(),
    feedId: Joi.number().required(),
  })

  try {
    const validate = await schema.validateAsync(req.body)

    const getFeed = await prisma.feed.findUnique({
      where: {
        id: validate.feedId,
      },
      select: {
        authorId: true,
        id: true,
      },
    })

    if (!getFeed) {
      return res.status(400).send({
        message: `Feed: ${validate.feedId} Not Found`,
      })
    }

    if (getFeed.authorId !== req.user.id) {
      return res.status(401).send({
        message: "Access Denied",
      })
    }

    const updateFeed = await prisma.feed.update({
      data: {
        title: validate.title,
        content: validate.content,
      },
      where: {
        id: validate.feedId,
      },
    })

    return res.send(updateFeed)
  } catch (e) {
    return res.status(403).send(e.details)
  } finally {
  }
}

export default {
  create,
  list,
  get,
  likes,
  unlikes,
  screps,
  unscreps,
  remove,
  update,
}
