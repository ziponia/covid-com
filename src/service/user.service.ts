import $http from "@covid/lib/client"

export interface UpdateUserInfoRequest {
  name: string
}

export interface UpdateUserInfoResponse {}

const update = async (payload: UpdateUserInfoRequest) => {
  return $http.put<UpdateUserInfoResponse>(`/api/user`, payload)
}
export interface UpdateUserImageRequest {
  image: any
}

export interface UpdateUserImageResponse {}

const updateUserImage = async (payload: UpdateUserImageRequest) => {
  return $http.put<UpdateUserImageResponse>(`/api/user/_profile`, payload)
}

export default {
  update,
  updateUserImage,
}
