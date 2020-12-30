import React from "react"
import { providers, signIn } from "next-auth/client"
import { Card, Form, Input, Button, Checkbox, Col, Row } from "antd"
import { UserOutlined, LockOutlined, BorderOutlined } from "@ant-design/icons"
import "antd/dist/antd.css"
import { AppPageProps } from "../../_app.interface"
import SignPageTemplate from "../../templates/SignPageTemplate"

type Props = {}

const SignIn: AppPageProps<Props> = (props) => {
  const { providers } = props
  console.log(providers)
  return (
    <Row style={{ flex: 1 }}>
      <Col span={12}>
        <Card
          title="LOGIN PAGE"
          style={{ width: "100%", height: "100%", padding: "60px" }}>
          <p style={{ marginBottom: 20 }}>
            로그인을 통해 더욱 다양한 정보를 공유해보세요 :D
          </p>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}>
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                  message: "아이디를 입력하세요.",
                },
              ]}
              style={{ marginBottom: 7 }}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="아이디"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "비밀번호를 입력하세요.",
                },
              ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="비밀번호"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>자동로그인</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                비밀번호를 잊으셨나요?
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: 455, height: 40 }}>
                로그인
              </Button>
              <Button
                onClick={() => signIn("kakao")}
                style={{
                  marginTop: 10,
                  backgroundColor: "#FEE53B",
                  width: 455,
                  height: 40,
                  color: "#181601",
                  fontWeight: "bold",
                }}>
                KAKAO로 5초만에 로그인
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col
        span={12}
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/3951606/pexels-photo-3951606.jpeg?cs=srgb&dl=pexels-cottonbro-3951606.jpg&fm=jpg")`,
          backgroundSize: "cover",
        }}
      />
    </Row>
  )
}

SignIn.Layout = SignPageTemplate

SignIn.getInitialProps = async (context) => {
  return {
    // @ts-ignore
    providers: await providers(),
    sidebar: false,
  }
}

export default SignIn
