import React, { useState } from "react"
import CommentInput from "@covid/components/Comment/CommentInput"
import CommentList from "@covid/components/Comment/CommentList"
import sleep from "@covid/lib/sleep"
import { useSession } from "next-auth/client"
import { Tooltip } from "antd"

export type CommentProps = {}

const Comment: React.FC<CommentProps> = (props) => {
  const [session] = useSession()
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(false)
  const [tooltip, showTooltip] = useState(false)

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    showTooltip(false)
  }
  const onSubmit = async () => {
    if (comment.length === 0) {
      showTooltip(true)
      return
    }
    setLoading(true)
    await sleep(1000)
    setLoading(false)
  }
  return (
    <>
      <Tooltip
        title="댓글을 작성 해주세요"
        visible={tooltip}
        style={{ fontSize: 12 }}>
        <CommentInput
          value={comment}
          loading={loading}
          onChange={onChangeInput}
          disabled={!session || comment.length === 0}
          onSubmit={onSubmit}
        />
      </Tooltip>
      <CommentList comments={[]} />
    </>
  )
}

export default Comment
