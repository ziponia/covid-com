import React from "react"
import { AppPageProps } from "../../_app.interface"

type Props = {}

const PostCreatePage: AppPageProps<Props> = (props) => {
  return (
    <div>
      <h1>post create page</h1>
    </div>
  )
}

PostCreatePage.getInitialProps = async (ctx) => {
  console.log("PostCreatePage")
  return {
    sidebar: false,
  }
}

export default PostCreatePage
