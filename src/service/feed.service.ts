import $http from "@covid/lib/client"
import { Feed as IFeed, users as IUser } from "@prisma/client"

export type FeedType = IFeed & {
  author: IUser
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
}

const list = async (params?: ListFeedRequest) => {
  return $http.get<ListFeedResponse>(`/api/feeds`, { params })
}

export interface CreateFeedRequest {
  title: string
  content: string
}

export interface CreateFeedResponse extends FeedType {}

const create = async (payload: CreateFeedRequest) => {
  return $http.post<CreateFeedResponse>(`/api/feed`, payload)
}

export default {
  list,
  create,
}
