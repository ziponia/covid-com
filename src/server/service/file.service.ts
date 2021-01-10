import AWS from "aws-sdk"
import { AppApiRequest } from "@covid/_app.interface"
import { NextApiResponse } from "next"
import multer from "multer"

const up = multer()

const upload = async (req: AppApiRequest, res: NextApiResponse) => {
  // const { prefix = "", bucket = "storage.linkube.com" } = req.body
  const upp = up.array("files")

  console.log(
    "upp",
    upp(req as any, res as any, (err: any) => console.log(err)),
  )
  console.log("req.query", req.query)
  console.log("req.files", req.file)
  console.log("req.body", req.body)

  AWS.config.update({
    accessKeyId: process.env.AWS_ASSCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACEESS_KEY,
  })

  res.send({
    test: 1,
  })

  // const S3 = new AWS.S3()
  //
  // const objParams = {
  //   Bucket: "bucket",
  //   // eslint-disable-next-line no-useless-concat
  //   Key: `${"storage.linkube.com/"}${info.file.name}`,
  //   Body: info.file,
  //   ContentType: info.file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
  // }
  //
  // S3.putObject(objParams)
  //   // eslint-disable-next-line func-names
  //   .on("httpUploadProgress", function ({ loaded, total }) {
  //     //   onProgress(
  //     //     {
  //     //       percent: Math.round((loaded / total) * 100),
  //     //     },
  //     //     file,
  //     //   )
  //   })
  //   // eslint-disable-next-line func-names
  //   .send(function (err) {
  //     if (err) {
  //       // onError()
  //       // console.log("Something went wrong")
  //       // console.log(err.code)
  //       // console.log(err.message)
  //     } else {
  //       // onSuccess(data.response, file)
  //       // console.log("SEND FINISHED")
  //     }
  //   })
}

export default {
  upload,
}
