import $http from "@covid/lib/client"
import { UploadFile } from "antd/lib/upload/interface"

export interface FileUploadRequest {
  files?: Array<UploadFile>
}

export interface FileUploadResponse {
  accessUri: string
}

const upload = (params: FileUploadRequest) => {
  const form = new FormData()

  const { files } = params

  if (!files) return

  for (let i = 0; i < files.length; i++) {
    console.log("payload.item(i)", files[i].originFileObj)
    form.append("files", files[i].originFileObj as any)
  }
  return $http.post<FileUploadResponse>(`/api/file/_upload`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export default {
  upload,
}
