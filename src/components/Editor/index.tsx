import React, { useState, useRef, useEffect, useCallback, useMemo } from "react"
import ReactQuill from "react-quill"
import styled from "styled-components"

import "react-quill/dist/quill.snow.css"
import "react-quill/dist/quill.bubble.css"
import "react-quill/dist/quill.core.css"

import fileService, { FileUploadResponse } from "@covid/service/file.service"
import { AxiosResponse } from "axios"
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
  formats?: string[]
  data?: AxiosResponse<FileUploadResponse>
}

const _Editor: React.FC<EditorProps> = (props) => {
  const [value, setValue] = useState(props.value || "")

  const quillInstance = useRef<ReactQuill>(null)

  const imageHandler = async () => {
    const input = document.createElement("input")

    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
    input.onchange = async () => {
      const { files } = input

      if (files && files.length > 0) {
        try {
          const { data } = await fileService.upload({ files })

          if (data.accessUri) {
            const editor = quillInstance.current!.getEditor()
            const range = editor.getSelection(true)

            editor.insertEmbed(range.index, "image", data.accessUri)
          }
        } catch (e) {
          console.log("error", e)
        } finally {
        }
      }
    }
  }

  // const toolbar = quill.getModule("toolbar")
  // toolbar.addHandler("image", imageHandler)

  const _onChange = (text: string) => {
    const { onChange } = props
    setValue(text)
    if (onChange) onChange(text)
  }
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          ["link", "image", "video"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: { matchVisual: false },
    }),
    [],
  )

  return (
    <StyledEditor
      placeholder="당신의 생각을 알려주세요:)"
      value={value}
      onChange={_onChange}
      theme={props.theme}
      modules={modules}
      formats={props.formats}
      ref={quillInstance}
    />
  )
}

_Editor.defaultProps = {
  value: "",
  theme: "snow",
  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "size",
    "color",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
  ],
}

const Editor = Object.assign(_Editor, {
  TitleInput,
})

export default Editor
