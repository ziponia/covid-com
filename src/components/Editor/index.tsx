import React, { useState } from "react"
import ReactQuill from "react-quill"
import styled from "styled-components"

import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import "react-quill/dist/quill.core.css"
import TitleInput from "./TitleInput"

export { TitleInput }

const StyledEditor = styled(ReactQuill)`
  background-color: #fff;

  .ql-editor {
    min-height: 500px;
    font-size: 16px;
  }
`

export type EditorProps = {
  value?: string
  theme?: "snow" | "bubble"
  onChange?: (text: string) => void
}

const _Editor: React.FC<EditorProps> = (props) => {
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
      theme={props.theme}
    />
  )
}

_Editor.defaultProps = {
  value: "",
  theme: "snow",
}

const Editor = Object.assign(_Editor, {
  TitleInput,
})

export default Editor
