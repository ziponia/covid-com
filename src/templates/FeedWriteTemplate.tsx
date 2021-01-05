import { AppLayoutProps } from "@covid/_app.interface"
import { Layout } from "antd"
import React from "react"
import styled from "styled-components"

const StyledLayout = styled(Layout)`
  .ant-layout-content {
    background-color: #ffffff;
  }
`

type Props = AppLayoutProps & {}

const FeedWriteTemplate: React.FC<Props> = (props) => {
  const { children } = props
  return (
    <StyledLayout>
      <Layout.Content style={{ display: "flex", flexDirection: "column" }}>
        {children}
      </Layout.Content>
    </StyledLayout>
  )
}

export default FeedWriteTemplate
