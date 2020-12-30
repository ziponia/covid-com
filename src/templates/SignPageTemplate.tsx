import React from "react"
import { Button, Layout, Menu, Tooltip } from "antd"
import { AppLayoutProps } from "../_app.interface"

type Props = AppLayoutProps & {}

const SignPageTemplate: React.FC<Props> = (props) => {
  const { children } = props

  return (
    <Layout className="app-layout">
      <Layout.Content className="__main">
        <Layout className="site-layout-background">
          <Layout.Content style={{ padding: 32, display: "flex" }}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export default SignPageTemplate
