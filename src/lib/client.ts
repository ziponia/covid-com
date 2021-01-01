import axios from "axios"

const isServer = typeof window === "undefined"

const $http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: isServer ? process.env.APP_DOMAIN : undefined,
})

export default $http
