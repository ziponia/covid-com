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
  modules: {
    toolbar: {
      container: (
        | string[]
        | (
            | {
                size: (string | boolean)[]
              }
            | {
                color: never[]
              }
          )[]
        | (
            | {
                list: string
              }
            | {
                indent: string
              }
            | {
                align: never[]
              }
          )[]
      )[]
    }

    clipboard: {
      matchVisual: boolean
    }
  }
  formats: string[]
  data?: AxiosResponse<FileUploadResponse> | undefined
}

const _Editor: React.FC<EditorProps> = (props) => {
  const [value, setValue] = useState(props.value || "")

  const quillElement = useRef()
  const quillInstance = useRef<ReactQuill>(null)
  const quill = quillInstance.current

  const imageHandler = async () => {
    console.log("imagehandler")
    const input = document.createElement("input")

    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()
    input.onchange = async () => {
      const files = input.files[0]
      console.log(files)
      // const files = new FormData()
      // files.append("image", files)

      // // Save current cursor state
      // // Range {index: 48, length: 0} 꼴
      // const range = quill.getSelection(true)
      // console.log(range)
      try {
        const { data } = await fileService.upload({ files })
        return data
        // if (data.uploaded) {
        //   // console.log(res.data.transforms[2].location)
        //   quillInstance.current.insertEmbed(
        //     range.index,
        //     "image",
        //    data.transforms[2].location,
        //   )
        //   quillInstance.current.setSelection(range.index + 1)
      } catch (e) {
        console.log("error", e)
      } finally {
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
  // modules: {
  //   toolbar: {
  //     container: [
  //       ["bold", "italic", "underline", "strike", "blockquote"],
  //       [{ size: ["small", false, "large", "huge"] }, { color: [] }],
  //       [
  //         { list: "ordered" },
  //         { list: "bullet" },
  //         { indent: "-1" },
  //         { indent: "+1" },
  //         { align: [] },
  //       ],
  //       ["link", "image", "video"],
  //       ["clean"],
  //     ],
  //   },
  //   clipboard: { matchVisual: false },
  // },
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
