import nc from "next-connect"
import feedService from "@covid/service/feed.service"
import userMiddleware from "@covid/server/user.middleware"

export default nc().use(userMiddleware).get(feedService.list)
