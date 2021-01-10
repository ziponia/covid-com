import AWS from "aws-sdk"

const upload = async (info: {
  file: { name?: any; status?: any }
  fileList: any
}) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ASSCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACEESS_KEY,
  })

  const S3 = new AWS.S3()
  console.log("file", info)
  console.log("file name", info.file.name)
  console.log("file type", info.file.type)

  const objParams = {
    Bucket: "bucket",
    // eslint-disable-next-line no-useless-concat
    Key: `${"storage.linkube.com/"}${info.file.name}`,
    Body: info.file,
    ContentType: info.file.type, // TODO: You should set content-type because AWS SDK will not automatically set file MIME
  }

  S3.putObject(objParams)
    // eslint-disable-next-line func-names
    .on("httpUploadProgress", function ({ loaded, total }) {
      //   onProgress(
      //     {
      //       percent: Math.round((loaded / total) * 100),
      //     },
      //     file,
      //   )
    })
    // eslint-disable-next-line func-names
    .send(function (err) {
      if (err) {
        // onError()
        // console.log("Something went wrong")
        // console.log(err.code)
        // console.log(err.message)
      } else {
        // onSuccess(data.response, file)
        // console.log("SEND FINISHED")
      }
    })
}

export default {
  upload,
}
