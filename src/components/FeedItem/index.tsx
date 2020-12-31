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

export type FeedItemProps = {}

const IconText = ({ icon, text }: any) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const FeedItem: React.FC<FeedItemProps> = (props) => {
  return (
    <StyledCard
      actions={[
        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        <IconText
          icon={MessageOutlined}
          text="2"
          key="list-vertical-message"
        />,
      ]}>
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={
            <Avatar
              src="https://avatars3.githubusercontent.com/u/44002901?s=460&u=305b1c9154337211cfef949836baff94f18e551f&v=4"
              size="large"
            />
          }
          title={
            <Link href={`/post/1`}>
              <a>Card title</a>
            </Link>
          }
        />
        <p>adsfsadfsadfdsafasfadsfsad</p>
      </Skeleton>
    </StyledCard>
  )
}

export default FeedItem
