import $http from "@covid/lib/client"
import { Feed as IFeed, users as IUser, Likes } from "@prisma/client"

export type FeedType = IFeed & {
  author: IUser
  Likes: Likes[]
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
  Likes: Likes
}

export interface LikeFeedRequest {
  feedId: number
}

const likes = async (payload: LikeFeedRequest) => {
  return $http.post<LikeFeedResponse>(`/api/feed/likes`, payload)
}

export interface UnLikeFeedResponse {
  countOfFeedLikes: number
}

export interface UnLikeFeedRequest {
  likeId: number
  feedId: number
}

const unlikes = async (payload: UnLikeFeedRequest) => {
  return $http.post<UnLikeFeedResponse>(`/api/feed/unlikes`, payload)
}

export default {
  list,
  create,
  get,
  likes,
  unlikes,
}
