import FeedHeader from "@covid/components/Feed/FeedHeader"
import feedService, { GetFeedResponse } from "@covid/service/feed.service"
import { AppPageProps } from "@covid/_app.interface"
import React, { useState } from "react"
import { Divider, Layout } from "antd"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"
import Head from "next/head"
import sleep from "@covid/lib/sleep"
import Comment from "@covid/containers/Comment"

const StyledLayout = styled(Layout)`
  max-width: 680px;
  margin: auto;
  background-color: #fff;
  padding: 20px;
`

type Props = {
  feed?: GetFeedResponse
}

const FeedDetailPage: AppPageProps<Props> = (props) => {
  //   console.log("props", props)
  const { feed } = props
  const router = useRouter()
  const [session] = useSession()

  const [comment, setComment] = useState("")
  const [loadingComment, setLoadingComment] = useState(false)

  if (!feed) {
    // ...TODO Skeleton
    return null
  }

  const _onBack = () => {
    router.back()
  }

  return (
    <>
      <Head>
        <title>{feed.title}</title>
      </Head>

      <StyledLayout>
        <FeedHeader title={feed.title} onBack={_onBack} />
        <Divider />
        <Layout.Content>
          <div dangerouslySetInnerHTML={{ __html: feed.content }} />
        </Layout.Content>
        <Divider />
        <Comment />
      </StyledLayout>
    </>
  )
}

FeedDetailPage.getInitialProps = async (ctx) => {
  const { id } = ctx.query

  let feed: GetFeedResponse | undefined
  if (id) {
    const { data } = await feedService.get(parseInt(id as string, 10))
    feed = data
  }
  return {
    header: false,
    feed,
  }
}

export default FeedDetailPage
