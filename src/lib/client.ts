import axios from "axios"

const $http = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
})

export default $http
