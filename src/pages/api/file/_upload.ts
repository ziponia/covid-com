import nc from "next-connect"
import fileService from "@covid/server/service/file.service"
import userMiddleware from "@covid/server/middleware/user.middleware"
import fileMiddleware from "@covid/server/middleware/file.middleware"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default nc()
  .use(userMiddleware)
  .use(fileMiddleware)
  .post(fileService.upload)
