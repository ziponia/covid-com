import React from "react"
import { Skeleton, Switch, Card, Avatar, Space } from "antd"
import styled from "styled-components"
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons"
import Link from "next/link"

const { Meta } = Card

const StyledCard = styled(Card)`
  border-radius: 7px;
  transition: all 300ms;
  max-width: 620px;
  border: 1px solid #ffffff;
  &:hover {
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
    /* transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); */
    border-color: #eee;
  }
`

export type FeedItemProps = {
  title: string
  content: string
  countlikes: number
  countscreps: number
  avatar?: string
}

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const FeedItem: React.FC<FeedItemProps> = (props) => {
  const { title, avatar, content, countlikes, countscreps } = props

  return (
    <StyledCard
      actions={[
        <IconText
          icon={StarOutlined}
          text={countscreps}
          key="list-vertical-star-o"
        />,
        <IconText
          icon={LikeOutlined}
          text={countlikes}
          key="list-vertical-like-o"
        />,
        <IconText
          icon={MessageOutlined}
          text="2"
          key="list-vertical-message"
        />,
      ]}>
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={avatar && <Avatar src={avatar} size="large" />}
          title={
            <Link href={`/post/1`}>
              <a>{title}</a>
            </Link>
          }
        />
        <p>{content}</p>
      </Skeleton>
    </StyledCard>
  )
}

export default FeedItem
