import React from "react"
import { Button, Layout, Menu, Tooltip } from "antd"
import Link from "next/link"
import { FiPower } from "react-icons/fi"
import { signIn } from "next-auth/client"

import PageHeader from "./PageHeader"
import { AppLayoutProps } from "../_app.interface"

type Props = AppLayoutProps & {}

const PageLayout: React.FC<Props> = (props) => {
  const { children, pageTitle, pageSubTitle, sidebar } = props
  console.log(props)
  return (
    <Layout className="app-layout">
      <Layout.Header className="app-header">
        <Link href="/">
          <a className="logo" href="/">
            코로나 커뮤니티
          </a>
        </Link>
        <span style={{ flex: 1 }} />

        <Button type="link" onClick={() => signIn()}>
          <Tooltip title="Sign-in">
            <FiPower />
          </Tooltip>
        </Button>
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
          {sidebar && (
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
          )}
          <Layout.Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export default PageLayout
