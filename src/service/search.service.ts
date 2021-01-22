import $http from "@covid/lib/client"
import {
  Feed as IFeed,
  users as IUser,
  Likes,
  Screps,
  Feed,
} from "@prisma/client"
import { User } from "next-auth"
import { Dayjs } from "dayjs"

export type FeedType = IFeed & {
  author: IUser
  Likes: Likes[]
  Screps: Screps[]
}

export interface ListFeedResponse {
  meta: {
    totalElements: number
  }
  items: FeedType[]
}

export interface ListFeedRequest {
  cursor?: number
  size?: number
  authorId?: number
  page?: number
  q?: string
}

const feedList = async (params?: ListFeedRequest) => {
  return $http.get<ListFeedResponse>(`/api/search`, { params })
}

export default {
  feedList,
}
