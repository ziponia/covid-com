import React from "react"
import { Layout, List, Comment as AntComment, Divider } from "antd"
import styled from "styled-components"
import { CommentWithUser } from "@covid/service/comment.service"
import dayjs from "dayjs"

import CommentItem from "./CommentItem"

export type CommentListProps = {
  comments: CommentWithUser[] // ...TODO type definition
  total?: number
  pagesize?: number
  loading?: boolean
  feedId: number
  currentUserId?: number
  onChangePage?: (page: number) => void
  onUpdateComplete?: (commentId: string, content: string) => void
  onDeleteComplete?: (commentId: string) => void
}

const CommentList: React.FC<CommentListProps> = (props) => {
  const onUpdateComplete = (commentId: string, content: string) => {
    const { onUpdateComplete } = props
    if (onUpdateComplete) onUpdateComplete(commentId, content)
  }

  const onDeleteComplete = (commentId: string) => {
    const { onDeleteComplete } = props
    if (onDeleteComplete) onDeleteComplete(commentId)
  }

  return (
    <Layout.Content>
      <List<CommentWithUser>
        className="comment-list"
        loading={props.loading}
        header={`${props.total} 댓글`}
        itemLayout="horizontal"
        dataSource={props.comments}
        pagination={{
          onChange: props.onChangePage,
          pageSize: props.pagesize,
          total: props.total,
        }}
        renderItem={(item) => (
          <li key={item.id}>
            <CommentItem
              author={item.user.name || "알수없음"}
              avatar={item.user.image || "A"}
              content={item.content}
              datetime={dayjs(item.created_at).format("YYYY. MM. DD. hh:mm")}
              me={props.currentUserId === item.userId}
              onUpdateComplete={(content) => onUpdateComplete(item.id, content)}
              onDeleteComplete={() => onDeleteComplete(item.id)}
            />
            <Divider />
          </li>
        )}
      />
    </Layout.Content>
  )
}

CommentList.defaultProps = {
  total: 0,
  comments: [],
}

export default CommentList
