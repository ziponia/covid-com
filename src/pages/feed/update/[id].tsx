import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { AppPageProps } from "@covid/_app.interface"
import { Layout, PageHeader, Button, Descriptions, message } from "antd"
import FeedWriteTemplate from "@covid/templates/FeedWriteTemplate"
import dynamic from "next/dynamic"
import TitleInput from "@covid/components/Editor/TitleInput"
import { useRouter } from "next/router"
import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons"
import feedService, { GetFeedResponse } from "@covid/service/feed.service"
import { getSession } from "next-auth/react"
import Joi, { ValidationError } from "joi"
import htmlToString from "@covid/lib/htmlToString"
import { Session } from "next-auth"

const Editor = dynamic(() => import("@covid/components/Editor/index"), {
  ssr: false,
})

type Props = {
  feed: GetFeedResponse
  session: Session | null
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
  const { feed: feedProps, session } = props
  const router = useRouter()

  const [feed, setFeed] = useState(feedProps)

  const _onBack = () => {
    router.back()
  }

  const _onChangeContent = (content: string) => {
    setFeed({
      ...feed,
      content,
    })
  }

  const _onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeed({
      ...feed,
      title: e.target.value,
    })
  }

  const _onSubmit = async () => {
    const schema = Joi.object({
      title: Joi.string().required().label("제목은 꼭 필요해요 🤣"),
      content: Joi.string().required().label("내용이 필요해요 🤣"),
    })

    let _message: ReturnType<typeof message.loading> | null = null

    try {
      _message = message.loading("열심히 고치는 중이에요...🔧")
      await schema.validateAsync({
        title: feed.title,
        content: htmlToString(feed.content),
      })

      const { data } = await feedService.update({
        title: feed.title,
        content: feed.content,
        feedId: feed.id,
      })

      message.success("수정이 완료 되었어요! 🎉")
    } catch (e) {
      const { details } = e
      details.forEach((item: any) => {
        message.error(item.context.label)
      })
    } finally {
      _message && _message()
    }
  }

  return (
    <StyledLayout>
      <PageHeader title="" className="haader-input-container">
        <Descriptions size="default">
          <Descriptions.Item>
            <Button
              style={{ height: 60, width: 120, fontSize: 24 }}
              type="text"
              onClick={_onBack}
              icon={<ArrowLeftOutlined className="ico-back" />}>
              {" "}
            </Button>
          </Descriptions.Item>
          <Descriptions.Item>
            <span style={{ flex: 1 }} />
            <Button
              style={{ height: 60, width: 120, fontSize: 24 }}
              type="text"
              onClick={_onSubmit}
              icon={<CheckOutlined />}>
              완료
            </Button>
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size="default">
          <Descriptions.Item>
            <TitleInput
              placeholder="제목..."
              value={feed.title}
              onChange={_onChangeTitle}
            />
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
      <Editor theme="bubble" value={feed.content} onChange={_onChangeContent} />
    </StyledLayout>
  )
}

UpdateFeedPage.Layout = FeedWriteTemplate

UpdateFeedPage.getInitialProps = async (ctx) => {
  const { id } = ctx.query
  const { data: feed } = await feedService.get(parseInt(id as string, 10))
  const session = await getSession(ctx)

  // ...TODO User Owner Feed Check

  return {
    header: false,
    session,
    feed,
  }
}

export default UpdateFeedPage
