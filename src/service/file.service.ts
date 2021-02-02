import $http from "@covid/lib/client"
import { UploadFile } from "antd/lib/upload/interface"

export interface FileUploadRequest {
  files?: Array<UploadFile> | FileList
}

export interface FileUploadResponse {
  accessUri: string
}

const upload = (params: FileUploadRequest) => {
  const form = new FormData()

  const { files } = params

  if (!files) {
    throw new Error("파일이 1개이상 존재해야 합니다.")
  }

  const uploadFiles: File[] = []

  if (files instanceof FileList) {
    console.log("File Instance", files.item(0))
    for (let i = 0; i < files.length; i++) {
      uploadFiles.push(files.item(i) as File)
    }
  } else if (files instanceof Array) {
    for (let i = 0; i < files.length; i++) {
      uploadFiles.push(files[i].originFileObj as File)
    }
  }

  for (let i = 0; i < uploadFiles.length; i++) {
    form.append("files", uploadFiles[i] as any)
  }

  console.log("uploadFiles", uploadFiles)

  return $http.post<FileUploadResponse>(`/api/file/_upload`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export default {
  upload,
}
