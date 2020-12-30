import React from "react"
import { Button, Input, Tooltip } from "antd"
import styled from "styled-components"
import { FiArrowLeft, FiCheck } from "react-icons/fi"
import Editor from "../../components/Editor"
import { AppPageProps } from "../../_app.interface"

const StyledContainer = styled.div`
  max-width: 960px;
  margin: auto;

  .post-create-title {
    margin-bottom: 20px;
  }

  .action-block {
    display: flex;
    align-items: center;
    height: 80px;
  }

  .location-back-icon {
    svg {
      height: 100%;
      width: 100%;
    }
  }
`
type Props = {}

const PostCreatePage: AppPageProps<Props> = (props) => {
  return (
    <StyledContainer>
      <div className="action-block">
        <Tooltip title="뒤로가기">
          <Button
            type="link"
            shape="circle"
            size="large"
            className="location-back-icon"
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
            icon={<FiCheck />}
          />
        </Tooltip>
      </div>
      <Input size="large" className="post-create-title" />
      <Editor />
    </StyledContainer>
  )
}

PostCreatePage.getInitialProps = async (ctx) => {
  return {
    sidebar: false,
    header: false,
  }
}

export default PostCreatePage
