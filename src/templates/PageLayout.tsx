import React from "react"
import { Layout, Menu, Tooltip } from "antd"
import Link from "next/link"
import { FiPower } from "react-icons/fi"

import PageHeader from "./PageHeader"
import { AppLayoutProps } from "../../next-env"

type Props = AppLayoutProps & {}

const PageLayout: React.FC<Props> = (props) => {
  const { children, pageTitle, pageSubTitle } = props
  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">
        <Link href="/">
          <a className="logo" href="/">
            코로나 커뮤니티
          </a>
        </Link>
        <span style={{ flex: 1 }} />
        <Link href="/login">
          <a>
            <Tooltip title="Sign-in">
              <FiPower />
            </Tooltip>
          </a>
        </Link>
      </Layout.Header>
      <Layout.Content className="__main" style={{ padding: "0 50px" }}>
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}>
          <Layout.Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}>
              <Menu.Item key="1">Home</Menu.Item>
              <Menu.Item key="2">커뮤니티</Menu.Item>
            </Menu>
          </Layout.Sider>
          <Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export default PageLayout
