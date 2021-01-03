import React, { useState } from "react"
import ReactQuill from "react-quill"
import styled from "styled-components"

import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import "react-quill/dist/quill.core.css"

const StyledEditor = styled(ReactQuill)`
  background-color: #fff;
  margin: auto;

  .ql-editor {
    min-height: 500px;
  }
`

export type EditorProps = {
  value?: string
  onChange?: (text: string) => void
}

const Editor: React.FC<EditorProps> = (props) => {
  const [value, setValue] = useState(props.value || "")

  const _onChange = (text: string) => {
    const { onChange } = props
    setValue(text)
    if (onChange) onChange(text)
  }

  return (
    <StyledEditor
      placeholder="당신의 생각을 알려주세요:)"
      value={value}
      onChange={_onChange}
      theme="snow"
    />
  )
}

Editor.defaultProps = {
  value: "",
}

export default Editor
