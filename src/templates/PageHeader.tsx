import React from "react"
import { PageHeader as AntPageHeader } from "antd"

type Props = {
  title?: string
  subTitle?: string
}

const PageHeader: React.FC<Props> = (props) => {
  const { title, subTitle } = props

  if (!title && !subTitle) return null

  return (
    <AntPageHeader
      className="site-page-header"
      onBack={() => null}
      title={title}
      subTitle={subTitle}
    />
  )
}

export default PageHeader
