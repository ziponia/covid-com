import React, { useState, ReactNode } from "react"
import "antd/dist/antd.css"
import { Modal, Button } from "antd"

export type DefualtModalProps = {
  visible?: boolean
  loading?: boolean
  handleCancel?: () => void
  handleOk?: () => void
}

const DefualtModal: React.FC<DefualtModalProps> = (props) => {
  return (
    <div>
      <Modal
        title="Title"
        visible={props.visible}
        footer={[
          <Button key="back" onClick={props.handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={props.loading}
            onClick={props.handleOk}>
            Submit
          </Button>,
        ]}
      />
    </div>
  )
}
export default Modal
