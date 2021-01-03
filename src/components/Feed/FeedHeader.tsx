import { PageHeader } from "antd"
import { PageHeaderProps } from "antd/lib/page-header"
import React from "react"

export type FeedHeaderProps = PageHeaderProps & {}

const FeedHeader: React.FC<FeedHeaderProps> = (props) => {
  return <PageHeader {...props} />
}

export default FeedHeader
