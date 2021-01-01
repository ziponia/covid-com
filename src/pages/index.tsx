import React, { useState } from "react"
import {
  Affix,
  BackTop,
  Button,
  Col,
  Layout,
  List,
  PageHeader,
  Row,
} from "antd"
import { BsPencil } from "react-icons/bs"
import { NextPageContext } from "next"
import { Feed } from "@prisma/client"
import dynamic from "next/dynamic"
import Router from "next/router"
import Link from "next/link"

import { AppPageProps } from "@covid/_app.interface"
import FeedItem from "@covid/components/FeedItem"
import htmlToString from "@covid/lib/htmlToString"
import feedService, {
  CreateFeedResponse,
  FeedType,
  ListFeedResponse,
} from "@covid/service/feed.service"

const FeedWriteDrawer = dynamic(() => import("../containers/FeedWriteDrawer"), {
  ssr: false,
})

type Props = {
  data: ListFeedResponse
}

const IndexPage: AppPageProps<Props> = (props) => {
  const { pageTitle, pageSubTitle, data, ...rest } = props

  const [feeds, setFeeds] = useState(data)

  const [affixed, setAffixed] = useState(false)

  const onAffixChange = (affixed?: boolean) => {
    setAffixed(!!affixed)
  }

  const handleCloseFeedWriteDrawer = () => {
    Router.push({
      hash: undefined,
    })
  }

  const onCreateFeed = async (newFeed?: CreateFeedResponse) => {
    handleCloseFeedWriteDrawer()
    const { data } = await feedService.list()
    setFeeds(data)
  }

  const onPostWriteVisiableChange = (show: boolean) => {}

  return (
    <>
      <Layout>
        <Affix onChange={onAffixChange}>
          <PageHeader
            title={pageTitle}
            subTitle={pageSubTitle}
            style={{
              paddingTop: 0,
              backgroundColor: affixed ? "#fff" : undefined,
              borderBottom: affixed ? "1px solid #eee" : undefined,
            }}
            extra={
              <Link href="/#/post/create">
                <a>
                  <Button icon={<BsPencil />} type="primary">
                    글쓰기
                  </Button>
                </a>
              </Link>
            }
          />
        </Affix>
        <Row>
          <Col span={12}>
            <List<FeedType>
              dataSource={feeds?.items}
              itemLayout="vertical"
              size="large"
              renderItem={(item) => (
                <List.Item key={item.id} style={{ marginBottom: 10 }}>
                  <FeedItem
                    title={item.title}
                    content={htmlToString(item.content)}
                    avatar={item.author.image || undefined}
                    countlikes={item.likes}
                    countscreps={item.screps}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12} />
        </Row>
      </Layout>
      {typeof window !== "undefined" && (
        <FeedWriteDrawer
          visible={window.location.hash === "#/post/create"}
          destroyOnClose
          afterVisibleChange={onPostWriteVisiableChange}
          width={760}
          onSaved={onCreateFeed}
          onClose={handleCloseFeedWriteDrawer}
        />
      )}
      <BackTop />
    </>
  )
}

IndexPage.getInitialProps = async (context: NextPageContext) => {
  const { query } = context

  const { data } = await feedService.list()

  return {
    pageTitle: "커뮤니티",
    pageSubTitle: "코로나로 인해 힘든 이웃들과 고민을 나누어요",
    data,
  }
}

export default IndexPage
