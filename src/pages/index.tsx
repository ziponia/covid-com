import React from "react"
import { Button, Layout, PageHeader, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { BsPencil } from "react-icons/bs"
import Link from "next/link"

import { AppPageProps } from "../_app.interface"

interface Board {
  idx: number
  title: string
  content: string
  createDt: string
  author: string
  relate: number
}

const columns: ColumnsType<Board> = [
  {
    title: "번호",
    dataIndex: "idx",
    key: "idx",
  },
  {
    title: "제목",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "작성자",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "공감",
    dataIndex: "relate",
    key: "relate",
  },
  {
    title: "작성일",
    dataIndex: "createDt",
    key: "createDt",
  },
]

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
  const { pageTitle, pageSubTitle } = props
  return (
    <Layout>
      <PageHeader
        title={pageTitle}
        subTitle={pageSubTitle}
        style={{ paddingTop: 0 }}
        extra={
          <Link href="/post/create">
            <Button icon={<BsPencil />} type="primary">
              글쓰기
            </Button>
          </Link>
        }
      />
      <Table<Board>
        dataSource={mockData}
        columns={columns}
        rowKey={(item) => item.idx}
      />
    </Layout>
  )
}

IndexPage.getInitialProps = async (ctx) => {
  return {
    pageTitle: "커뮤니티",
    pageSubTitle: "코로나로 인해 힘든 이웃들과 고민을 나누어요",
  }
}

export default IndexPage
