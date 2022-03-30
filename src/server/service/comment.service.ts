import prisma from "@covid/server/prisma"
import { AppApiRequest } from "@covid/_app.interface"
import { NextApiResponse } from "next"
import Joi from "joi"

/**
 * 코멘트를 생성합니다.
 */
const create = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const schema = Joi.object({
    content: Joi.string().required(),
    feedId: Joi.number().required(),
  })

  try {
    const validate = await schema.validateAsync(req.body)

    const newComment = await prisma.comment.create({
      data: {
        content: validate.content,
        user: {
          connect: {
            id: req.user.id,
          },
        },
        feed: {
          connect: {
            id: validate.feedId,
          },
        },
      },
      include: {
        user: true,
        feed: true,
      },
    })

    return res.send(newComment)
  } catch (e) {
    console.log("error =>>>")
    return res.status(403).send(e.details)
  }
}

/**
 * 피드의 코멘트를 가져옵니다.
 */
const list = async (req: AppApiRequest, res: NextApiResponse) => {
  const schema = Joi.object({
    feedId: Joi.number(),
    size: Joi.number().default(20),
    page: Joi.number().default(1),
    userId: Joi.string(),
    _includeFeed: Joi.bool(),
  })

  try {
    const validate = await schema.validateAsync(req.query)
    const getComments = await prisma.comment.findMany({
      orderBy: {
        created_at: "desc",
      },
      where: {
        feedId: validate.feedId,
        userId: validate.userId,
      },
      skip: (validate.page - 1) * 10,
      take: validate.size,
      include: {
        user: true,
        feed: validate._includeFeed,
      },
    })

    const countOfComments = await prisma.comment.count({
      where: {
        feedId: validate.feedId,
      },
    })

    return res.status(200).send({
      meta: {
        totalElements: countOfComments,
      },
      items: getComments,
    })
  } catch (e) {
    return res.status(403).send(e.details)
  }
}

/**
 * 코멘트를 업데이트 합니다
 */

const update = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const schema = Joi.object({
    commentId: Joi.string().required(),
    content: Joi.string().required(),
  })

  try {
    const validate = await schema.validateAsync(req.body)

    // check my comment
    const prevComment = await prisma.comment.findUnique({
      where: {
        id: validate.commentId,
      },
      select: {
        userId: true,
      },
    })

    if (!prevComment) {
      return res.status(404).send({
        message: `${validate.commentId} is not found`,
      })
    }

    if (prevComment.userId !== req.user.id) {
      return res.status(403).send({
        message: `${validate.commentId} is not found`,
      })
    }

    const updateComment = await prisma.comment.update({
      data: {
        content: validate.content,
      },
      where: {
        id: validate.commentId,
      },
    })

    res.status(200).send(updateComment)
  } catch (e) {
    return res.status(403).send(e.details)
  }
}

/**
 * 코멘트를 삭제합니다.
 */
const remove = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const schema = Joi.object({
    commentId: Joi.string().required(),
  })

  try {
    const validate = await schema.validateAsync(req.body)
    // check my comment
    const prevComment = await prisma.comment.findUnique({
      where: {
        id: validate.commentId,
      },
      select: {
        userId: true,
      },
    })

    if (!prevComment) {
      return res.status(404).send({
        message: `${validate.commentId} is not found`,
      })
    }

    if (prevComment.userId !== req.user.id) {
      return res.status(403).send({
        message: `${validate.commentId} is not found`,
      })
    }

    const removeComment = await prisma.comment.delete({
      where: {
        id: validate.commentId,
      },
    })

    res.status(200).send(removeComment)
  } catch (e) {
    return res.status(400).send(e.details)
  } finally {
  }
}

export default {
  create,
  list,
  update,
  remove,
}
