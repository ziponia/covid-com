import axios from "axios"

const $http = axios.create({
  headers: {
    "Content-Type": "application/jsons",
  },
})

export default $http
