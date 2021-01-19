import React, { useState, useEffect } from "react"

import Link from "next/link"
import { Input, Button, Row, Col, BackTop, Grid } from "antd"
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
import { SearchOutlined } from "@ant-design/icons"
import searchService from "@covid/service/search.service"
import { useSession } from "next-auth/client"

const { useBreakpoint } = Grid

type Props = {
  data: ListFeedResponse
  searchText: string
  onSearch: () => void
}

const SearchPage: AppPageProps<Props> = (props) => {
  const { Search } = Input
  const screens = useBreakpoint()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ListFeedResponse>()
  const [searchText, setSearchText] = useState("")
  const [timer, setTimer] = useState(0)

  const onSearch = async (e: any) => {
    setSearchText(e.target.value)

    if (timer) {
      window.clearTimeout(timer)
    }

    const _setTimer = window.setTimeout(async (page: number) => {
      try {
        const { data } = await searchService.feedList({
          searchText,
        })
        setResults(data)
      } catch (e) {
        console.error("error", e)
      }
    }, 800)

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
              placeholder="궁금한 키워드를 검색해보세요"
              loading={loading}
              onChange={onSearch}
              value={searchText}
              enterButton
            />
            {results?.items.map((item) => (
              <div key={item.id}>
                <h4>{item.title}</h4>
              </div>
            ))}
          </Col>
        </Row>
      </Layout>

      <BackTop />
    </>
  )
}

export default SearchPage
