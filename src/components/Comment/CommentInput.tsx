import React from "react"
import { Layout, Input, Button } from "antd"
import { FiCheck } from "react-icons/fi"

const { TextArea } = Input

export type CommentInputProps = {
  value?: string
  loading?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const CommentInput: React.FC<CommentInputProps> = (props) => {
  return (
    <Layout.Content>
      <TextArea
        value={props.value}
        onChange={props.onChange}
        placeholder="댓글..."
        autoSize={{ minRows: 3, maxRows: 5 }}
        style={{ marginBottom: 20 }}
      />

      <Button
        icon={<FiCheck />}
        type="primary"
        loading={props.loading}
        disabled={props.disabled}
        onClick={props.onSubmit}>
        저장
      </Button>
    </Layout.Content>
  )
}

CommentInput.defaultProps = {
  value: "",
}

export default CommentInput
