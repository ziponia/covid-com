import React, { useState } from "react"
import {
  Button,
  Layout,
  PageHeader,
  Affix,
  BackTop,
  List,
  Row,
  Col,
} from "antd"
import { ColumnsType } from "antd/lib/table"
import { BsPencil } from "react-icons/bs"
import { NextPageContext } from "next"
import { Feed } from "@prisma/client"
import dynamic from "next/dynamic"
import Router from "next/router"
import Link from "next/link"

import { AppPageProps } from "@covid/_app.interface"
import FeedItem from "@covid/components/FeedItem"
import useRequest from "@covid/hooks/useRequest"

const FeedWriteDrawer = dynamic(() => import("../containers/FeedWriteDrawer"), {
  ssr: false,
})

type Props = {}

const IndexPage: AppPageProps<Props> = (props) => {
  const { pageTitle, pageSubTitle, ...rest } = props

  const { data: feeds } = useRequest<{
    meta: {
      totalElements: number
    }
    items: Feed[]
  }>({
    url: "/api/feeds",
  })

  const [affixed, setAffixed] = useState(false)

  const onAffixChangee = (affixed?: boolean) => {
    setAffixed(!!affixed)
  }

  const onPostWriteVisiableChange = (show: boolean) => {}

  return (
    <>
      <Layout>
        <Affix onChange={onAffixChangee}>
          <PageHeader
            title={pageTitle}
            subTitle={pageSubTitle}
            style={{
              paddingTop: 0,
              backgroundColor: affixed ? "#fff" : undefined,
              borderBottom: affixed ? "1px solid #eee" : undefined,
            }}
            extra={
              <Link href="/#/post/create">
                <a>
                  <Button icon={<BsPencil />} type="primary">
                    글쓰기
                  </Button>
                </a>
              </Link>
            }
          />
        </Affix>
        <Row>
          <Col span={12}>
            <List<Feed>
              dataSource={feeds?.items}
              itemLayout="vertical"
              size="large"
              renderItem={(item) => (
                <List.Item key={item.id} style={{ marginBottom: 10 }}>
                  <FeedItem />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12} />
        </Row>
      </Layout>
      {typeof window !== "undefined" && (
        <FeedWriteDrawer
          visible={window.location.hash === "#/post/create"}
          destroyOnClose
          afterVisibleChange={onPostWriteVisiableChange}
          width={760}
          onClose={() => {
            Router.push({
              hash: undefined,
            })
          }}
        />
      )}
      <BackTop />
    </>
  )
}

IndexPage.getInitialProps = async (context: NextPageContext) => {
  const { query } = context

  return {
    pageTitle: "커뮤니티",
    pageSubTitle: "코로나로 인해 힘든 이웃들과 고민을 나누어요",
  }
}

export default IndexPage
