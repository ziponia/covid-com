import nc from "next-connect"
import fileService from "@covid/server/service/file.service"
import userMiddleware from "@covid/server/middleware/user.middleware"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default nc().use(userMiddleware).post(fileService.upload)
