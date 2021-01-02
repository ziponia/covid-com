import React from "react"
import { Layout, List, Comment as AntComment, Divider } from "antd"
import styled from "styled-components"
import CommentItem from "./CommentItem"

const StyledList = styled(List)``

export type CommentListProps = {
  comments: any[] // ...TODO type definition
  total?: number
}

const CommentList: React.FC<CommentListProps> = (props) => {
  return (
    <Layout.Content>
      <StyledList
        className="comment-list"
        header={`${props.total} 댓글`}
        itemLayout="horizontal"
        dataSource={new Array(100).fill(true)}
        pagination={{
          onChange: console.log,
          pageSize: 10,
          total: props.total,
        }}
        renderItem={(item) => (
          <li>
            <CommentItem
              author="kuby"
              avatar="http://k.kakaocdn.net/dn/cf2MB9/btqRvaRjcE0/SZFR9dl42XkSuQkqBAXDck/img_640x640.jpg"
              content="그러게요 ㅠㅠ 다른건 아닌데 마스크가 젤 싫어.."
              datetime="2020. 12. 22. 13:22"
              me
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
