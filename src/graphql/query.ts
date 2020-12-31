import { gql } from "@apollo/client"

export const INITIAL_QUERY = gql`
  query {
    _version
    _appName
  }
`
