import $http from "./client"

const fetcher = (url: string) =>
  $http.get(url).then((res) => (res as any).datas)

export default fetcher
