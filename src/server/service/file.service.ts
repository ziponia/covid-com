import AWS from "aws-sdk"
import { AppApiRequest } from "@covid/_app.interface"
import { NextApiResponse } from "next"
import path from "path"
import Joi from "joi"
import dayjs from "dayjs"
import fs from "fs"

const upload = async (req: AppApiRequest, res: NextApiResponse) => {
  if (!req.user) {
    return res.status(401).send({
      message: "required authentication",
    })
  }

  const {
    prefix = req.user.id,
    bucket = process.env.S3_BUCKET as string,
  } = req.body

  const schema = Joi.object({
    files: Joi.object().required(),
  })

  try {
    await schema.validateAsync(req.files)
  } catch (e) {
    return res.status(403).send(e.details)
  }

  const { files } = (req.files! as unknown) as {
    files: File
  }

  const { name, size, type, text } = files

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_APP,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
  })

  const S3 = new AWS.S3()

  const rid = () => {
    return Math.random().toString(36).slice(2, 5)
  }

  const _extention = path.extname(name)
  const generateRandomeKey = rid() + rid() + rid()
  const makeKey = `${prefix}/${generateRandomeKey}${_extention}`

  const buf = fs.readFileSync((files as any).path)

  const request: AWS.S3.PutObjectRequest = {
    Bucket: bucket,
    Key: makeKey,
    ACL: "public-read",
    Body: buf,
    ContentType: type,
    ContentLength: size,
    Metadata: {
      user: req.user.id.toString(),
      upload_date: dayjs().toISOString(),
      FILE_NAME: name,
    },
  }

  try {
    await S3.putObject(request).promise()

    return res.send({
      accessUri: `${process.env.CDN_SERVER_HOST}/${makeKey}`,
    })
  } catch (e) {
    return res.status(500).send(e)
  }
}

export default {
  upload,
}
