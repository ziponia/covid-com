import React, { useState } from "react"
import { Card, Form, Input, Row, Col, Button } from "antd"
import { AppPageProps } from "../../_app.interface"
import "antd/dist/antd.css"

type Props = {}

const SignUp: AppPageProps<Props> = (props) => {
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  }
  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 20,
    },
  }
  return (
    <Row style={{ flex: 1 }}>
      <Card
        title="SIGN UP PAGE"
        style={{
          width: "50%",
          height: "100%",
          padding: "60px",
          margin: "0 auto",
        }}>
        <Form {...layout}>
          <Form.Item
            name="id"
            label="아이디"
            rules={[
              {
                required: true,
                message: "아이디를 입력하세요.",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="비밀번호"
            rules={[
              {
                required: true,
                message: "비밀번호를 입력하세요",
              },
            ]}
            hasFeedback>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="비밀번호 확인"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "비밀번호를 확인하세요.",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve()
                  }
                  // eslint-disable-next-line prefer-promise-reject-errors
                  return Promise.reject("비밀번호가 일치하지 않습니다.")
                },
              }),
            ]}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="닉네임"
            rules={[
              {
                required: true,
                message: "닉네임을 입력하세요.",
                whitespace: true,
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="이메일"
            rules={[
              {
                type: "email",
                message: "이메일 형식이 아닙니다.",
              },
              {
                required: true,
                message: "이메일을 입력하세요.",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              가입하기
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default SignUp
