import nc from "next-connect"
import userService from "@covid/server/service/user.service"
import userMiddleware from "@covid/server/middleware/user.middleware"

export default nc().use(userMiddleware).put(userService.update)
