import React from "react"
import { Button, Input } from "antd"
import styled from "styled-components"
import { FiArrowLeft } from "react-icons/fi"
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
    height: 80px;
    align-items: center;
  }

  .location-back-icon {
    height: 100%;
  }
`
type Props = {}

const PostCreatePage: AppPageProps<Props> = (props) => {
  return (
    <StyledContainer>
      <div className="action-block">
        <Button
          type="link"
          icon={<FiArrowLeft className="location-back-icon" />}
        />
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
