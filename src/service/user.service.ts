import $http from "@covid/lib/client"

export interface UpdateUserInfoRequest {
  name: String
}

export interface UpdateUserInfoResponse {}

const update = async (payload: UpdateUserInfoRequest) => {
  return $http.post<UpdateUserInfoResponse>(`/api/user`, payload)
}

export default {
  update,
}
