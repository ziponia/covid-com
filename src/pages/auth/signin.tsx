import { Button, Card, Col, Grid, Row } from "antd"
import "antd/dist/antd.css"
import { signIn, getProviders } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import SignPageTemplate from "../../templates/SignPageTemplate"
import { AppPageProps } from "../../_app.interface"

const { useBreakpoint } = Grid

type Props = {}

const SignIn: AppPageProps<Props> = (props) => {
  const { query } = useRouter()
  const screen = useBreakpoint()

  const signInKakao = () => {
    signIn("kakao", {
      callbackUrl: query.callbackUrl as string,
    })
  }

  const isMobileScreen = screen.xs && !screen.md

  return (
    <Row style={{ flex: 1 }}>
      <Col span={!isMobileScreen ? 10 : 24}>
        <Card
          title="LOGIN PAGE"
          style={{
            width: "100%",
            height: "100%",
            padding: !isMobileScreen ? 60 : 10,
          }}>
          <p style={{ marginBottom: 20 }}>
            로그인을 통해 더욱 다양한 정보를 공유해보세요 :D
          </p>
          {/* <Form
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
            <Row>
              <Col span={18}>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>자동로그인</Checkbox>
                  </Form.Item>
                  <a className="login-form-forgot" href="">
                    비밀번호를 잊으셨나요?
                  </a>
                </Form.Item>
              </Col>
              <Col span={6} style={{ textAlign: "right" }}>
                <Link href="/auth/signup">
                  <a className="sign-up" style={{ color: "#595959" }}>
                    회원가입
                  </a>
                </Link>
              </Col>
            </Row>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%", height: 40 }}>
                로그인
              </Button>
            </Form.Item>
          </Form> */}
          <Button
            onClick={signInKakao}
            style={{
              marginTop: 10,
              backgroundColor: "#FEE53B",
              width: "100%",
              height: 40,
              color: "#181601",
              fontWeight: "bold",
            }}>
            KAKAO로 5초만에 로그인
          </Button>
        </Card>
      </Col>
      {!screen.xs && (
        <Col
          span={14}
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/3951606/pexels-photo-3951606.jpeg?cs=srgb&dl=pexels-cottonbro-3951606.jpg&fm=jpg")`,
            backgroundSize: "cover",
          }}
        />
      )}
    </Row>
  )
}

SignIn.Layout = SignPageTemplate

SignIn.getInitialProps = async (context) => {
  return {
    providers: await getProviders(),
    sidebar: false,
  }
}

export default SignIn
