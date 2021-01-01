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

const get = async (id: number) => {
  return $http.get(`/api/feed/${id}`)
}

export interface LikeFeedResponse {
  countOfFeedLikes: number
}

const likes = async (id: number) => {
  return $http.post<LikeFeedResponse>(`/feed/likes/${id}`)
}

export interface UnLikeFeedResponse {
  countOfFeedLikes: number
}

const unlikes = async (id: number) => {
  return $http.post<UnLikeFeedResponse>(`/feed/unlikes/${id}`)
}

export default {
  list,
  create,
  get,
  likes,
  unlikes,
}
