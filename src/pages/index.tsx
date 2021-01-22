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
  Grid,
} from "antd"
import { BsPencil } from "react-icons/bs"
import { NextPageContext } from "next"
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
import { SearchOutlined } from "@ant-design/icons"

const { useBreakpoint } = Grid

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
  const screens = useBreakpoint()

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

  const _onLikeFeed = async (feedId: number) => {
    const { data } = await feedService.likes({
      feedId,
    })

    const updateFeed = { ...feeds }

    updateFeed.items = updateFeed.items.map((feed) => {
      if (feed.id === feedId) {
        return {
          ...feed,
          likes: data.countOfFeedLikes,
          Likes: [data.Likes],
        }
      }
      return feed
    })

    setFeeds(updateFeed)
  }

  const _onUnLikeFeed = async (likeId: string, feedId: number) => {
    const { data } = await feedService.unlikes({
      feedId,
      likeId,
    })
    const updateFeed = { ...feeds }

    updateFeed.items = updateFeed.items.map((feed) => {
      if (feed.id === feedId) {
        return {
          ...feed,
          Likes: [],
          likes: data.countOfFeedLikes,
        }
      }
      return feed
    })

    setFeeds(updateFeed)
  }

  const _onScrepFeed = async (feedId: number) => {
    const { data } = await feedService.screps({
      feedId,
    })

    const updateFeed = { ...feeds }

    updateFeed.items = updateFeed.items.map((feed) => {
      if (feed.id === feedId) {
        return {
          ...feed,
          screps: data.countOfFeedScreps,
          Screps: [data.Screps],
        }
      }
      return feed
    })

    setFeeds(updateFeed)
  }

  const _onUnScrepFeed = async (screpId: string, feedId: number) => {
    const { data } = await feedService.unscreps({
      feedId,
      screpId,
    })
    const updateFeed = { ...feeds }

    updateFeed.items = updateFeed.items.map((feed) => {
      if (feed.id === feedId) {
        return {
          ...feed,
          Screps: [],
          screps: data.countOfFeedScreps,
        }
      }
      return feed
    })

    setFeeds(updateFeed)
  }

  const onPostWriteVisiableChange = (show: boolean) => {}

  return (
    <>
      <Layout>
        <Affix onChange={onAffixChange}>
          <PageHeader
            title={!affixed && pageTitle}
            subTitle={pageSubTitle}
            style={{
              backgroundColor: affixed ? "#fff" : undefined,
              borderBottom: affixed ? "1px solid #eee" : undefined,
              transition: "all 300ms",
            }}
            extra={[
              <Link key="serachBtn" href="/search">
                <Button
                  icon={<SearchOutlined />}
                  type="default"
                  style={{ borderColor: "#1890ff", color: "#1890ff" }}>
                  검색
                </Button>
              </Link>,
              <Link key="writeBtn" href="/#/post/create">
                <a>
                  <Button icon={<BsPencil />} type="primary">
                    글쓰기
                  </Button>
                </a>
              </Link>,
            ]}
          />
        </Affix>
        <Row>
          <Col
            md={12}
            xs={24}
            sm={!screens.md ? 24 : 12}
            offset={screens.xs || !screens.md ? 0 : 6}>
            <List<FeedType>
              dataSource={feeds?.items}
              itemLayout="vertical"
              size="large"
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  style={{ marginBottom: 10, padding: screens.xs ? 0 : 16 }}>
                  <FeedItem
                    id={item.id}
                    title={item.title}
                    content={htmlToString(item.content)}
                    avatar={item.author.image || undefined}
                    countlikes={item.likes}
                    countscreps={item.screps}
                    like={item.Likes.length > 0}
                    screp={item.Screps.length > 0}
                    createDt={item.created_at}
                    onLike={() => _onLikeFeed(item.id)}
                    onUnLike={() => {
                      if (item.Likes.length === 0) return
                      return _onUnLikeFeed(item.Likes[0].id, item.id)
                    }}
                    onScrep={() => _onScrepFeed(item.id)}
                    onUnScrep={() => {
                      if (item.Screps.length === 0) return
                      return _onUnScrepFeed(item.Screps[0].id, item.id)
                    }}
                  />
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Layout>
      {typeof window !== "undefined" && (
        <FeedWriteDrawer
          visible={window.location.hash === "#/post/create"}
          destroyOnClose
          afterVisibleChange={onPostWriteVisiableChange}
          width={!screens.md ? "100%" : 760}
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
