import React from "react"
import { Modal, Button } from "antd"

export type DefualtModalProps = {
  visible?: boolean
  loading?: boolean
  title: string
  onCancel?: () => void
  onOk?: () => void
}

const DefualtModal: React.FC<DefualtModalProps> = (props) => {
  const { children } = props
  return (
    <div>
      <Modal
        title={props.title}
        visible={props.visible}
        footer={[
          <Button key="back" onClick={props.onCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={props.loading}
            onClick={props.onOk}>
            Submit
          </Button>,
        ]}>
        {children}
      </Modal>
    </div>
  )
}
export default DefualtModal
