import $http from "@covid/lib/client"
import { Comment, Feed, users as User } from "@prisma/client"
import { AxiosResponse } from "axios"

export interface ListCommentRequest {
  feedId?: number
  page?: number
  size?: number
  userId?: number
  _includeFeed?: boolean
}

export interface CommentWithUser extends Comment {
  user: User
  feed?: Feed
}

export interface ListCommentResponse {
  meta: { totalElements: number }
  items: CommentWithUser[]
}

const list = (params: ListCommentRequest) => {
  return $http.get<ListCommentResponse>(`/api/comment`, {
    params,
  })
}

export interface CreateCommentRequest {
  content: string
  feedId: number
}

export interface CreateCommentResponse extends Comment {
  user: User
  feed: Feed
}

const create = (payload: CreateCommentRequest) => {
  return $http.post<CreateCommentResponse>(`/api/comment`, payload)
}

export interface UpdateCommentRequest {
  commentId: string
  content: string
}

export interface UpdateCommentResponse extends Comment {}

const update = (payload: UpdateCommentRequest) => {
  return $http.put<UpdateCommentResponse>(`/api/comment`, payload)
}

export interface RemoveCommentRequest {
  commentId: string
}
const remove = (payload: RemoveCommentRequest) => {
  return $http.post(`/api/comment/_delete`, payload)
}

export default {
  list,
  create,
  update,
  remove,
}
