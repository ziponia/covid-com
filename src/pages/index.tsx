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
import dynamic from "next/dynamic"
import Router from "next/router"
import Link from "next/link"
import useSWR from "swr"

import { AppPageProps } from "../_app.interface"
import FeedItem from "../components/FeedItem"
import useRequest from "../hooks/useRequest"

const FeedWriteDrawer = dynamic(() => import("../containers/FeedWriteDrawer"), {
  ssr: false,
})
interface Board {
  idx: number
  title: string
  content: string
  createDt: string
  author: string
  relate: number
}

const mockData: Board[] = Array(100)
  .fill(true)
  .map((_, index) => ({
    idx: index + 1,
    author: `Kuby-${index}`,
    content: "다들 너무 힘든시기에 ...",
    createDt: "2020. 09. 03. 12:11",
    title: "다들 너무 힘든시기에...",
    relate: 30,
  }))

type Props = {}

const IndexPage: AppPageProps<Props> = (props) => {
  const { pageTitle, pageSubTitle, ...rest } = props

  const { data } = useRequest<{ version: string }>({
    url: "/api/_site",
    params: {
      a: 1,
    },
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
            <List
              dataSource={mockData}
              itemLayout="vertical"
              size="large"
              renderItem={(item) => (
                <List.Item key={item.idx} style={{ marginBottom: 10 }}>
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
