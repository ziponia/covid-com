import React, { useState } from "react"
import { Skeleton, Switch, Card, Avatar, Space, Button } from "antd"
import styled from "styled-components"
import {
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons"
import Link from "next/link"

const { Meta } = Card

const StyledCard = styled(Card)`
  border-radius: 7px;
  transition: all 300ms;
  border: 1px solid #ffffff;
  &:hover {
    /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24); */
    /* transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); */
    border-color: #eee;
  }
`

export type FeedItemProps = {
  id: number
  title: string
  content: string
  countlikes: number
  countscreps: number
  avatar?: string
  like?: boolean
  likeLoading?: boolean
  onLike?: () => void
  onUnLike?: () => void
}

type IconTextProps = {
  icon: any
  text: any
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

const StyledSpace = styled(Space)`
  .ant-space-item {
    width: 100%;
    button {
      padding: 0;
    }
  }
`

const IconText: React.FC<IconTextProps> = ({
  icon,
  text,
  onClick,
  disabled,
  loading,
}) => (
  <StyledSpace style={{ width: "100%" }}>
    <Button
      onClick={onClick}
      icon={icon}
      disabled={disabled}
      loading={loading}
      type="text"
      style={{ width: "100%" }}>
      {text}
    </Button>
  </StyledSpace>
)

const FeedItem: React.FC<FeedItemProps> = (props) => {
  const {
    id,
    title,
    avatar,
    content,
    countlikes,
    countscreps,
    onLike,
    onUnLike,
    like,
  } = props

  const _onLike = () => {
    onLike && onLike()
  }

  const _onUnLike = () => {
    onUnLike && onUnLike()
  }

  return (
    <StyledCard
      actions={[
        <IconText
          icon={<StarOutlined />}
          text={countscreps}
          key="list-vertical-star-o"
        />,
        <IconText
          icon={like ? <LikeFilled /> : <LikeOutlined />}
          text={countlikes}
          key="list-vertical-like-o"
          loading={props.likeLoading}
          disabled={props.likeLoading}
          onClick={!like ? _onLike : _onUnLike}
        />,
        <IconText
          icon={<MessageOutlined />}
          text="2"
          key="list-vertical-message"
        />,
      ]}>
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={avatar && <Avatar src={avatar} size="large" />}
          title={
            <Link href={`/feed/${id}`}>
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
