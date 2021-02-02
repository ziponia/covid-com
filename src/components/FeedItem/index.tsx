import React, { useEffect, useState, Component } from "react"
import { Skeleton, Switch, Card, Avatar, Space, Button } from "antd"
import styled from "styled-components"
import {
  LikeFilled,
  LikeOutlined,
  MessageOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import dayjs from "dayjs"
import { parse } from "node-html-parser"

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
  countlikes?: number
  countscreps?: number
  avatar?: string
  like?: boolean
  screp?: boolean
  originContent?: string
  createDt: Date
  onLike?: () => Promise<void> | void
  onUnLike?: () => Promise<void> | void
  onScrep?: () => Promise<void> | void
  onUnScrep?: () => Promise<void> | void
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
    like,
    screp,
    onLike, // function
    onUnLike,
    onScrep,
    onUnScrep,
  } = props

  const [loading, setLoading] = useState(false)
  const [screpLoading, setScrepLoading] = useState(false)

  const _onLike = async () => {
    try {
      setLoading(true)
      onLike && (await onLike())
    } finally {
      setLoading(false)
    }
  }

  const _onUnLike = async () => {
    try {
      setLoading(true)
      onUnLike && (await onUnLike())
    } finally {
      setLoading(false)
    }
  }

  const _onScrep = async () => {
    try {
      setScrepLoading(true)
      onScrep && (await onScrep())
    } finally {
      setScrepLoading(false)
    }
  }

  const _onUnScrep = async () => {
    try {
      setScrepLoading(true)
      onUnScrep && (await onUnScrep())
    } finally {
      setScrepLoading(false)
    }
  }

  const getImage = (content: string) => {
    const doc = parse(content)

    const image = doc.querySelector("img")
    const src = image?.getAttribute("src")

    if (src) {
      return <img src={`${src}`} alt={title} />
    }

    return undefined
  }

  const renderAction = (counter: any) => (Component: JSX.Element) => {
    if (typeof counter === "undefined") {
      return null
    }
    return Component
  }

  return (
    <StyledCard
      cover={getImage(props.originContent!)}
      actions={[
        renderAction(countscreps)(
          <IconText
            icon={screp ? <StarFilled /> : <StarOutlined />}
            text={countscreps}
            key="list-vertical-star-o"
            loading={screpLoading}
            disabled={screpLoading}
            onClick={!screp ? _onScrep : _onUnScrep}
          />,
        ),
        renderAction(countlikes)(
          <IconText
            icon={like ? <LikeFilled /> : <LikeOutlined />}
            text={countlikes}
            key="list-vertical-like-o"
            loading={loading}
            disabled={loading}
            onClick={!like ? _onLike : _onUnLike}
          />,
        ),

        // <IconText
        //   icon={<MessageOutlined />}
        //   text="2"
        //   key="list-vertical-message"
        // />,
      ]}>
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={avatar && <Avatar src={avatar} size="large" />}
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}>
              <Link href={`/feed/${id}`}>
                <a>{title}</a>
              </Link>
              <span style={{ flex: 1 }} />
              <small style={{ fontSize: 12, color: "#666" }}>
                {dayjs(props.createDt).format("YYYY. MM. DD. hh:mm")}
              </small>
            </div>
          }
        />
        <p>{content}</p>
      </Skeleton>
    </StyledCard>
  )
}

export default FeedItem
