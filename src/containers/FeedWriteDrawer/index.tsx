import React, { useState } from "react"
import { Button, Card, Divider, Drawer, Input, Spin, Tooltip, Grid } from "antd"
import { DrawerProps } from "antd/lib/drawer"
import styled from "styled-components"
import { FiArrowLeft, FiCheck } from "react-icons/fi"

import Editor from "@covid/components/Editor"
import feedService, { CreateFeedResponse } from "@covid/service/feed.service"

const { useBreakpoint } = Grid

type StyledContainerProps = FeedWriteDrawerProps & {
  screens: ReturnType<typeof useBreakpoint>
}

const StyledDrawer = styled(Drawer)<StyledContainerProps>`
  .ant-drawer-body {
    ${(props) => props.screens.xs && `padding:0`}
  }
`

const StyledContainer = styled(Card)<{
  screens: ReturnType<typeof useBreakpoint>
}>`
  margin: auto;
  border: 0;

  .post-create-title {
    margin-bottom: 20px;
    ${(props) => props.screens.xs && `margin-bottom:0`}
  }

  .action-block {
    display: flex;
    align-items: center;
    height: 60px;
  }

  .location-back-icon {
    svg {
      height: 100%;
      width: 100%;
    }
  }
  .ant-card-body {
    ${(props) => props.screens.xs && `padding:0`}
  }
`

export type FeedWriteDrawerProps = DrawerProps & {
  onClose?: (e?: any) => void
  onSaved?: (data?: CreateFeedResponse) => void
}

const FeedWriteDrawer: React.FC<FeedWriteDrawerProps> = (props) => {
  const screens = useBreakpoint()
  const { children, onSaved, ...rest } = props

  const [feed, setFeed] = useState({
    title: "",
    content: "",
  })

  const [loading, setLoading] = useState(false)

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onClose } = props
    onClose && onClose(e)
  }

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeed({
      ...feed,
      title: e.target.value,
    })
  }

  const onChangeContent = (text: string) => {
    setFeed({
      ...feed,
      content: text,
    })
  }

  const clearFeedFields = () => {
    setFeed({
      title: "",
      content: "",
    })
  }

  const handleSubmit = async () => {
    const { onClose } = props
    try {
      setLoading(true)
      const { data } = await feedService.create(feed)
      clearFeedFields()
      onSaved && onSaved(data)
    } catch (e) {
      console.log("error", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <StyledDrawer screens={screens} {...rest}>
      <StyledContainer screens={screens}>
        <Spin spinning={loading}>
          <Divider>글쓰기</Divider>
          <div
            className="action-block"
            style={{ padding: screens.xs ? 16 : 0 }}>
            <Tooltip title="뒤로가기">
              <Button
                size="large"
                type="ghost"
                shape="circle"
                className="location-back-icon"
                onClick={handleClose}
                icon={<FiArrowLeft />}
              />
            </Tooltip>
            <span style={{ flex: 1 }} />
            <Tooltip title="완료">
              <Button
                type="ghost"
                shape="circle"
                size="large"
                className="location-back-icon"
                onClick={handleSubmit}
                icon={<FiCheck />}
              />
            </Tooltip>
          </div>
          <Input
            size="large"
            className="post-create-title"
            placeholder="제목을 입력하세요 :)"
            onChange={onChangeTitle}
            value={feed.title}
          />
          <Editor value={feed.content} onChange={onChangeContent} />
        </Spin>
      </StyledContainer>
    </StyledDrawer>
  )
}

FeedWriteDrawer.defaultProps = {
  closable: false,
}

export default FeedWriteDrawer
