import nc from "next-connect"
import commentService from "@covid/server/service/comment.service"
import userMiddleware from "@covid/server/middleware/user.middleware"

export default nc()
  .use(userMiddleware)
  .post(commentService.create)
  .get(commentService.list)
  .put(commentService.update)
  .delete(commentService.remove)
