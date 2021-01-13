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
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          취소
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={props.onOk}>
          저장
        </Button>,
      ]}>
      {children}
    </Modal>
  )
}
export default DefualtModal
