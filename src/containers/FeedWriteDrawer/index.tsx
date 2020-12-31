import React, { useState } from "react"
import { Button, Divider, Drawer, Input, Tooltip } from "antd"
import { DrawerProps } from "antd/lib/drawer"
import styled from "styled-components"
import { FiArrowLeft, FiCheck } from "react-icons/fi"

import Editor from "../../components/Editor"
import $http from "../../lib/client"

const StyledContainer = styled.div`
  margin: auto;

  .post-create-title {
    margin-bottom: 20px;
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
`

export type FeedWriteDrawerProps = DrawerProps & {}

const FeedWriteDrawer: React.FC<FeedWriteDrawerProps> = (props) => {
  const { children, ...rest } = props

  const [feed, setFeed] = useState({
    title: "",
    content: "",
  })

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

  const handleSubmit = async () => {
    try {
      const { data } = await $http.post(`/api/feed`, feed)
      console.log("data", data)
    } catch (e) {
      console.log("error", e)
    } finally {
    }
  }

  return (
    <Drawer {...rest}>
      <StyledContainer>
        <Divider>글쓰기</Divider>
        <div className="action-block">
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
          placeholder="생각을 알려주세요 :)"
          onChange={onChangeTitle}
          value={feed.title}
        />
        <Editor value={feed.content} onChange={onChangeContent} />
      </StyledContainer>
    </Drawer>
  )
}

FeedWriteDrawer.defaultProps = {
  closable: false,
}

export default FeedWriteDrawer
