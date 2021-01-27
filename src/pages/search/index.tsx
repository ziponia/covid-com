import React, { useState, useEffect } from "react"

import Link from "next/link"
import { Input, Button, Row, Col, BackTop, Grid, List, Empty, Spin } from "antd"
import InfiniteScroll from "react-infinite-scroller"
import styled from "styled-components"
import { NextPageContext } from "next"
import { AppLayoutProps, AppPageProps } from "@covid/_app.interface"
import Layout from "antd/lib/layout/layout"
import { BsPencil } from "react-icons/bs"
import { useRouter, Router } from "next/router"
import { SearchOutlined } from "@ant-design/icons"
import searchService, {
  FeedType,
  ListFeedResponse,
} from "@covid/service/search.service"
import { useSession } from "next-auth/client"
import FeedItem from "@covid/components/FeedItem"
import htmlToString from "@covid/lib/htmlToString"

const { useBreakpoint } = Grid

type Props = {
  data?: ListFeedResponse
}

const SearchPage: AppPageProps<Props> = (props) => {
  const { data, ...rest } = props
  const { Search } = Input
  const screens = useBreakpoint()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ListFeedResponse | undefined>(data)
  const [timer, setTimer] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState(data?.items[data.items.length - 1].id)

  const router = useRouter()
  const { query } = router

  const onSearch = async (e: any) => {
    if (timer) {
      window.clearTimeout(timer)
    }
    const { value } = e.target

    const initiallistFeedResponse: ListFeedResponse = {
      meta: {
        totalElements: 0,
      },
      items: [],
    }

    const _setTimer = window.setTimeout(async (page: number) => {
      router.push(
        {
          query: { q: value },
        },
        undefined,
        { shallow: true },
      )
      if (value.length === 0) {
        setResults(initiallistFeedResponse)
        return
      }
      try {
        const { data } = await searchService.feedList({
          q: value,
        })
        setResults(data)
      } catch (e) {
        console.error("error", e)
      }
    }, 600)
    setTimer(_setTimer)
  }

  const handleInfiniteOnLoad = async () => {
    try {
      setLoading(true)
      console.log(cursor)
      console.log(query.q)
      const { data } = await searchService.feedList({ cursor, q: query.q })

      setCursor(data?.items[data.items.length - 1].id)

      setResults({
        meta: {
          ...results?.meta,
        },
        items: results?.items.concat(data.items),
      })

      setLoading(true)
    } catch (e) {
      console.log("error", e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Layout>
        <Row>
          <Col
            md={12}
            xs={24}
            sm={!screens.md ? 24 : 12}
            offset={screens.xs || !screens.md ? 0 : 6}>
            <Search
              style={screens.xs ? { padding: "3%", marginBottom: "2%" } : {}}
              placeholder="궁금한 키워드를 검색해보세요."
              loading={loading}
              onChange={onSearch}
              defaultValue={query.q || ""}
              enterButton
              size="large"
            />
            <Spin spinning={loading}>
              <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={hasMore}
                useWindow>
                <List<FeedType>
                  dataSource={results?.items}
                  itemLayout="vertical"
                  size="large"
                  locale={{ emptyText: <></> }}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      style={{
                        marginBottom: 10,
                        padding: screens.xs ? 0 : 16,
                      }}>
                      <FeedItem
                        id={item.id}
                        title={item.title}
                        content={htmlToString(item.content)}
                        avatar={item.author.image || undefined}
                        createDt={item.created_at}
                      />
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </Spin>
          </Col>
        </Row>
      </Layout>

      <BackTop />
    </>
  )
}

SearchPage.getInitialProps = async (context) => {
  const { query } = context

  if (!query.q) {
    return {}
  }

  const { data } = await searchService.feedList({
    q: query.q as string,
  })

  return {
    data,
  }
}

export default SearchPage
