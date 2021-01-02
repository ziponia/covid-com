import nc from "next-connect"
import feedService from "@covid/server/service/feed.service"
import userMiddleware from "@covid/server/middleware/user.middleware"

export default nc().use(userMiddleware).post(feedService.unscreps)
