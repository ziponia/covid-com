import FeedHeader from "@covid/components/Feed/FeedHeader"
import feedService, { GetFeedResponse } from "@covid/service/feed.service"
import { AppPageProps } from "@covid/_app.interface"
import React, { useState } from "react"
import {
  Divider,
  Layout,
  Descriptions,
  Avatar,
  Button,
  Modal,
  Result,
  message,
  notification,
} from "antd"
import styled from "styled-components"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import Head from "next/head"
import Comment from "@covid/containers/Comment"
import dayjs from "dayjs"
import {
  LikeOutlined,
  StarOutlined,
  DeleteOutlined,
  EditOutlined,
  StarFilled,
  LikeFilled,
} from "@ant-design/icons"

const StyledLayout = styled(Layout)`
  max-width: 680px;
  margin: auto;
  background-color: #fff;
  padding: 20px;

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
  .content img {
    max-width: 100%;
  }
`

const StyledDescriptions = styled(Descriptions)`
  .ant-descriptions-item-container {
    align-items: center;

    .ant-descriptions-item-content {
      align-items: center;
    }
  }
`

type Props = {
  feed?: GetFeedResponse
}

const FeedDetailPage: AppPageProps<Props> = (props) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [feed, setFeed] = useState<GetFeedResponse | undefined>(props.feed)

  const [deleteModal, setDeleteModal] = useState(false)
  const [loadingScrep, setLoadingScrep] = useState(false)
  const [loadingLike, setLoadingLike] = useState(false)

  const loggedIn = session && session.user
  const isScrep = loggedIn && feed && feed.Screps.length > 0
  const isLike = loggedIn && feed && feed.Likes.length > 0

  if (!feed) {
    // ...TODO Skeleton
    return null
  }

  const _onBack = () => {
    router.back()
  }

  const _onDeleteClick = () => {
    setDeleteModal(true)
  }

  const _onDelete = async () => {
    await feedService.remove({ feedId: feed.id })
    router.replace(`/`)
  }

  const _onEditClick = async () => {
    router.push(`/feed/update/${feed.id}`)
    // message.info({
    //   content: "수정 기능은 아직 개발중이에요 🥲\n조금만 기다려 주세요.",
    // })
  }

  const 로그인이_필요함 = () => {
    notification.warn({
      message: "로그인이 필요해요. 🥲",
    })
  }

  const _onScrep = async () => {
    if (!feed || !loggedIn) {
      return 로그인이_필요함()
    }

    try {
      setLoadingScrep(true)
      if (isScrep) {
        const { data } = await feedService.unscreps({
          screpId: feed.Screps[0].id,
          feedId: feed.id,
        })

        setFeed({
          ...feed,
          screps: data.countOfFeedScreps,
          Screps: [],
        })
      } else {
        const { data } = await feedService.screps({
          feedId: feed.id,
        })
        setFeed({
          ...feed,
          screps: data.countOfFeedScreps,
          Screps: [data.Screps],
        })
      }
    } finally {
      setLoadingScrep(false)
    }
  }

  const _onLike = async () => {
    if (!feed || !loggedIn) {
      return 로그인이_필요함()
    }
    try {
      setLoadingLike(true)
      if (isLike) {
        const { data } = await feedService.unlikes({
          feedId: feed.id,
          likeId: feed.Likes[0].id,
        })

        setFeed({
          ...feed,
          Likes: [],
          likes: data.countOfFeedLikes,
        })
      } else {
        const { data } = await feedService.likes({
          feedId: feed.id,
        })

        setFeed({
          ...feed,
          Likes: [data.Likes],
          likes: data.countOfFeedLikes,
        })
      }
    } finally {
      setLoadingLike(false)
    }
  }

  const isPermission = session && (session.user as any)?.id === feed.authorId

  return (
    <>
      <Head>
        <title>{feed.title}</title>
      </Head>

      <StyledLayout>
        <FeedHeader
          title={feed.title}
          onBack={_onBack}
          extra={
            isPermission
              ? [
                  <Button
                    key="on-delete-button"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={_onDeleteClick}
                  />,
                  <Button
                    key="on-edit-button"
                    type="primary"
                    onClick={_onEditClick}
                    icon={<EditOutlined />}
                  />,
                ]
              : []
          }
          style={{ padding: 0 }}>
          <StyledDescriptions
            column={2}
            size="small"
            style={{ alignItems: "center", marginBottom: 20 }}>
            <Descriptions.Item style={{ alignItems: "center" }}>
              <Avatar
                src={feed.author.image}
                size="large"
                style={{ marginRight: 5 }}
              />
              <span>{feed.author.name}</span>
            </Descriptions.Item>
          </StyledDescriptions>
          <StyledDescriptions size="small" column={2}>
            <Descriptions.Item>
              <Button
                loading={loadingScrep}
                onClick={_onScrep}
                icon={isScrep ? <StarFilled /> : <StarOutlined />}
                type="text">
                스크랩 {feed.screps}
              </Button>
              {/* <hr style={{ margin: 20 }} /> */}
              <Button
                loading={loadingLike}
                icon={isLike ? <LikeFilled /> : <LikeOutlined />}
                onClick={_onLike}
                type="text">
                공감 {feed.likes}
              </Button>
            </Descriptions.Item>
            <Descriptions.Item>
              <div className="date-feed">
                생성 - {dayjs(feed.created_at).format("YYYY. MM. DD. hh:mm")}
                <br />
                수정 - {dayjs(feed.updated_at).format("YYYY. MM. DD. hh:mm")}
              </div>
            </Descriptions.Item>
          </StyledDescriptions>
        </FeedHeader>

        <Divider />
        <Layout.Content>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: feed.content }}
          />
        </Layout.Content>
        <Divider />
        <Comment feedId={feed.id} />
      </StyledLayout>
      {isPermission && (
        <Modal
          title={feed.title}
          visible={deleteModal}
          footer={false}
          onCancel={() => setDeleteModal(false)}>
          <Result
            title="정말 삭제하실꺼에요?"
            status="error"
            extra={[
              <Button
                key="no"
                type="primary"
                onClick={() => setDeleteModal(false)}>
                아니요
              </Button>,
              <Button key="yes" danger onClick={_onDelete}>
                네
              </Button>,
            ]}
          />
        </Modal>
      )}
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
