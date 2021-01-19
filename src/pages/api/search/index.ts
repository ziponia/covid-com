import nc from "next-connect"
import searchService from "@covid/server/service/search.service"

export default nc().get(searchService.feedList)
