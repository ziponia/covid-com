import React, { useState } from "react"
import { Comment as AntComment } from "antd"
import TextArea from "antd/lib/input/TextArea"

export type CommentItemProps = {
  author?: string
  avatar?: string
  content?: string
  datetime?: string
  me?: boolean
  onUpdateComplete?: () => void
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const [mode, setMode] = useState<"default" | "update">("default")
  const [_content, setContent] = useState(props.content)

  const handleUpdate = () => {
    setMode("update")
  }

  const onUpdateComplete = () => {
    setMode("default")
  }

  const onUpdateCancel = () => {
    setMode("default")
    setContent(props.content)
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const Actions = () => {
    if (mode === "update") {
      return [
        <span key="comment-cancel" onClick={onUpdateCancel}>
          취소
        </span>,
        <span key="comment-complete" onClick={onUpdateComplete}>
          완료
        </span>,
      ]
    }
    if (mode === "default") {
      return [
        <span key="comment-update" onClick={handleUpdate}>
          수정
        </span>,
        <span key="comment-delete">삭제</span>,
      ]
    }
  }

  const Content = () => {
    if (mode === "update") {
      return <TextArea value={_content} onChange={onChange} />
    }
    return _content
  }

  return (
    <AntComment
      author={props.author}
      actions={props.me ? Actions() : []}
      avatar={props.avatar}
      content={Content()}
      datetime={props.datetime}
    />
  )
}

export default CommentItem
