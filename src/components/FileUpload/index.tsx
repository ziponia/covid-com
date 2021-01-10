import React, { useState } from "react"
import "antd/dist/antd.css"
import { Upload, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"
import AWS from "aws-sdk"
import { DraggerProps } from "antd/lib/upload"

const { Dragger } = Upload
// const [fileList, updateFileList] = useState([])

export type FileUploadProp = DraggerProps & {}
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
}
const FileUpload: React.FC<FileUploadProp> = (props) => {
  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  )
}
export default FileUpload
