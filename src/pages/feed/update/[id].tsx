import React from "react"
import styled from "styled-components"
import { AppPageProps } from "@covid/_app.interface"
import { Layout, Input, PageHeader, Button, Descriptions } from "antd"
import FeedWriteTemplate from "@covid/templates/FeedWriteTemplate"
import dynamic from "next/dynamic"
import TitleInput from "@covid/components/Editor/TitleInput"
import { useRouter } from "next/router"
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons"
import feedService, { GetFeedResponse } from "@covid/service/feed.service"

const Editor = dynamic(() => import("@covid/components/Editor/index"), {
  ssr: false,
})

type Props = {
  feed: GetFeedResponse
}

const StyledLayout = styled(Layout)`
  background-color: #fff;
  padding: 20px;
  flex: 1;
  min-width: 600px;
  max-width: 1100px;
  margin: auto;

  .ant-page-header {
    padding-left: 0;
    padding-right: 0;
  }
  .ant-descriptions-item {
    vertical-align: middle;
  }
  .date-feed {
    color: #666;
    font-size: 12px;
    margin-left: auto;
    .ant-descriptions-item-content {
      justify-content: flex-end;
    }
  }
`

const UpdateFeedPage: AppPageProps<Props> = (props) => {
  const { feed } = props
  const router = useRouter()
  return (
    <StyledLayout>
      <PageHeader title="" className="haader-input-container">
        <Descriptions size="default">
          <Descriptions.Item>
            <ArrowLeftOutlined style={{ fontSize: 40 }} className="ico-back" />
          </Descriptions.Item>
          <Descriptions.Item>
            <span style={{ flex: 1 }} />
            <Button
              key="on-complete-button"
              style={{ height: 60, width: 120, fontSize: 24 }}
              type="text"
              icon={<CheckOutlined />}>
              완료
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size="default">
          <Descriptions.Item>
            <TitleInput placeholder="제목..." value={feed.title} />
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Editor theme="bubble" value={feed.content} />
    </StyledLayout>
  )
}

UpdateFeedPage.Layout = FeedWriteTemplate

UpdateFeedPage.getInitialProps = async (ctx) => {
  const { id } = ctx.query
  const { data: feed } = await feedService.get(parseInt(id as string, 10))
  return {
    header: false,
    feed,
  }
}

export default UpdateFeedPage
