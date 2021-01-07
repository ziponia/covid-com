import $http from "@covid/lib/client"

export interface UpdateUserInfoRequest {
  name: string
}

export interface UpdateUserInfoResponse {}

const update = async (payload: UpdateUserInfoRequest) => {
  return $http.put<UpdateUserInfoResponse>(`/api/user`, payload)
}

export default {
  update,
}
