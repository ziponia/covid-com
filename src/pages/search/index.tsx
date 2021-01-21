import React, { useState, useEffect } from "react"

import Link from "next/link"
import { Input, Button, Row, Col, BackTop, Grid, List, Empty } from "antd"
import styled from "styled-components"
import { NextPageContext } from "next"
import { AppLayoutProps, AppPageProps } from "@covid/_app.interface"
import Layout from "antd/lib/layout/layout"
import { BsPencil } from "react-icons/bs"
import feedService, {
  CreateFeedResponse,
  FeedType,
  ListFeedResponse,
} from "@covid/service/feed.service"
import { useRouter, Router } from "next/router"
import { SearchOutlined } from "@ant-design/icons"
import searchService from "@covid/service/search.service"
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
  const router = useRouter()
  const { query } = router

  const onSearch = async (e: any) => {
    if (timer) {
      window.clearTimeout(timer)
    }
    const searchValue = e.target.value

    const initiallistFeedResponse: ListFeedResponse = {
      meta: {
        totalElements: 0,
      },
      items: [],
    }

    const _setTimer = window.setTimeout(async (page: number) => {
      router.push(
        {
          query: { q: searchValue },
        },
        undefined,
        { shallow: true },
      )
      if (searchValue.length === 0) {
        setResults(initiallistFeedResponse)
        return
      }
      try {
        const { data } = await searchService.feedList({
          searchText: searchValue,
        })
        setResults(data)
      } catch (e) {
        console.error("error", e)
      }
    }, 600)
    setTimer(_setTimer)
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
              placeholder="궁금한 키워드를 검색해보세요."
              loading={loading}
              onChange={onSearch}
              defaultValue={query.q || ""}
              enterButton
              size="large"
            />
            <List<FeedType>
              dataSource={results?.items}
              itemLayout="vertical"
              size="large"
              locale={{ emptyText: <></> }}
              renderItem={(item) => (
                <List.Item
                  key={item.id}
                  style={{ marginBottom: 10, padding: screens.xs ? 0 : 16 }}>
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
    searchText: query.q as string,
  })

  return {
    data,
  }
}

export default SearchPage
