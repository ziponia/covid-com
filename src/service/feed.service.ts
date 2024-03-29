import $http from "@covid/lib/client"
import {
  Feed as IFeed,
  User as IUser,
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
    cursor: number
  }
  items: FeedType[]
}

export interface ListFeedRequest {
  cursor?: number
  size?: number
  authorId?: number
  page?: number
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

export interface GetFeedResponse extends FeedType {}

const get = async (id: number) => {
  return $http.get<GetFeedResponse>(`/api/feed/${id}`)
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
  likeId: string
  feedId: number
}

const unlikes = async (payload: UnLikeFeedRequest) => {
  return $http.post<UnLikeFeedResponse>(`/api/feed/unlikes`, payload)
}

export interface ListScrapRequest {
  feedId?: number
  page?: number
  size?: number
  authorId?: number
  _includeFeed?: boolean
}

export interface ScrapWithUser extends Screps {
  author: User
  feed: FeedType
}

export interface ListScrapResponse {
  meta: { totalElements: number }
  items: ScrapWithUser[]
}

const scrapList = (params: ListScrapRequest) => {
  return $http.get<ListScrapResponse>(`/api/feed/scrap-list`, {
    params,
  })
}
export interface ScrepFeedRequest {
  feedId: number
}

export interface ScrepFeedResponse {
  countOfFeedScreps: number
  Screps: Screps
}

const screps = async (payload: ScrepFeedRequest) => {
  return $http.post<ScrepFeedResponse>(`/api/feed/screps`, payload)
}

export interface UnScrepFeedRequest {
  feedId: number
  screpId: string
}

export interface UnScrepFeedResponse {
  countOfFeedScreps: number
}

const unscreps = async (payload: UnScrepFeedRequest) => {
  return $http.post<UnScrepFeedResponse>(`/api/feed/unscreps`, payload)
}

export interface RemoveFeedRequest {
  feedId: number
}
const remove = async (payload: RemoveFeedRequest) => {
  return $http.post(`/api/feed/_delete`, payload)
}

export interface UpdateFeedRequest {
  feedId: number
  title: string
  content: string
}

export interface UpdateFeedResponse {}

const update = async (payload: UpdateFeedRequest) => {
  return $http.put(`/api/feed`, payload)
}

export default {
  list,
  create,
  get,
  likes,
  unlikes,
  screps,
  unscreps,
  remove,
  update,
  scrapList,
}
