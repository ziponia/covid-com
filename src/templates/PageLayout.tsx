import React from "react"
import { Avatar, Button, Layout, Menu, Tooltip } from "antd"
import Link from "next/link"
import dynamic from "next/dynamic"
import { FiPower } from "react-icons/fi"
import { signIn, useSession, signOut } from "next-auth/client"

import { AppLayoutProps } from "../_app.interface"

type Props = AppLayoutProps & {}

const PageLayout: React.FC<Props> = (props) => {
  const { children, pageTitle, pageSubTitle, header } = props
  const [session, loading] = useSession()

  const _signOut = () => {
    signOut({
      callbackUrl: window.location.href,
    })
  }

  return (
    <>
      <Layout className="app-layout">
        {header && (
          <Layout.Header className="app-header">
            <Link href="/">
              <a className="logo" href="/">
                코로나 커뮤니티
              </a>
            </Link>
            <span style={{ flex: 1 }} />

            {!session && (
              <Button type="link" onClick={() => signIn()}>
                <Tooltip title="Sign-in">
                  <FiPower />
                </Tooltip>
              </Button>
            )}
            {!!session && (
              <Tooltip title="Sign-Out">
                <a onClick={_signOut}>
                  <Avatar src={session?.user.image} />
                </a>
              </Tooltip>
            )}
          </Layout.Header>
        )}
        <Layout.Content className="__main">
          <Layout
            className="site-layout-background"
            style={{ padding: "24px 0" }}>
            <Layout.Content
              className="main-container"
              style={{ minHeight: 280 }}>
              {children}
            </Layout.Content>
          </Layout>
        </Layout.Content>
      </Layout>
    </>
  )
}

export default PageLayout
