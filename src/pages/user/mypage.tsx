import React from "react"
import { providers, useSession, signOut, signIn } from "next-auth/client"
import {
  Avatar,
  Row,
  Col,
  Card,
  Button,
  Layout,
  Menu,
  Tooltip,
  Tabs,
  Grid,
  List,
  Divider,
} from "antd"
import { LockOutlined, FieldTimeOutlined } from "@ant-design/icons"

import styled from "styled-components"
import { AppLayoutProps, AppPageProps } from "@covid/_app.interface"
import MyPageTemplate from "../../templates/MyPageTemplate"

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
  {
    title: "Ant Design Title 5",
  },
  {
    title: "Ant Design Title 6",
  },
]

const { useBreakpoint } = Grid
const { TabPane } = Tabs

type StyledContainerProps = {
  screens: ReturnType<typeof useBreakpoint>
}

const StyledCard = styled(Card)`
  border-radius: 7px;
  border: 1px solid #ffffff;
`
const StyledContent = styled.div<StyledContainerProps>`
  width: 100%;
  height: 400px;
  background-color: #fff;
  background-image: url("https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  /* background-attachment: fixed; */
  background-size: cover;
  background-position-y: -200px;
  background-repeat: no-repeat;
  position: relative;

  ${(props) => props.screens.xs && `background-position-y: 0px`};

  .title {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 600;
    font-size: 30px;
    color: #fff;
  }
`
const StyledTabs = styled.div<StyledContainerProps>`
  .ant-tabs-tab {
    font-size: 24px;
    ${(props) => props.screens.xs && `font-size:20px`}
  }
  .ant-list-pagination {
    text-align: center;
  }
  .seconday_text {
    font-size: 12px;
    color: #aaa;
    font-weight: 400;
    text-align: center;
  }
  .ant-tabs {
    height: 500px;
    ${(props) => props.screens.xs && `height:auto`}
  }
`
const StyledButton = styled(Button)`
  background-color: rgba(255, 255, 255, 0.4);
  width: 100%;
  border-radius: 15px;
  border: transparent;
  padding: 0px 10px;
  font-size: 12;
  color: #fff;
`
type Props = {}

const MyPage: AppPageProps<Props> = (props) => {
  const { providers } = props

  const screens = useBreakpoint()
  const isMobileScreen = screens.xs && !screens.md
  const [session, loading] = useSession()

  const callback = (key: any) => {
    console.log(key)
  }

  const _signOut = () => {
    signOut({
      callbackUrl: "/",
    })
  }

  return (
    <Row style={{ flex: 1 }}>
      <StyledContent screens={screens}>
        <div className="my_header">
          <Row style={{ padding: "24px" }}>
            <Col
              offset={!isMobileScreen ? 22 : 18}
              span={!isMobileScreen ? 2 : 6}>
              <StyledButton onClick={_signOut} style={{}}>
                <LockOutlined /> 로그아웃
              </StyledButton>
            </Col>
          </Row>
        </div>
        <div className="title">MY PAGE</div>
      </StyledContent>
      {!session && (
        <Col offset={!isMobileScreen ? 6 : 0} span={!isMobileScreen ? 12 : 24}>
          <StyledTabs screens={screens}>
            <Card
              style={{
                width: "100%",
                height: "100%",
                margin: "0 auto",
              }}>
              <Row>
                <Col span={1}>
                  <FieldTimeOutlined />
                </Col>
                <Col span={18}>
                  일정 시간이 지나 자동 로그아웃 되었습니다. 다시
                  로그인해주세요.
                </Col>
                <Col span={5}>
                  <Button type="primary" onClick={() => signIn()} style={{}}>
                    로그인
                  </Button>
                </Col>
              </Row>
            </Card>
          </StyledTabs>
        </Col>
      )}
      {!!session && (
        <Col
          offset={!isMobileScreen ? 6 : 0}
          span={!isMobileScreen ? 12 : 24}
          style={{ padding: "20px" }}>
          <StyledTabs screens={screens}>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="내가 쓴 글" key="1">
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  pagination={{
                    onChange: (page) => {
                      console.log(page)
                    },
                    pageSize: 5,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="스크랩" key="2">
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  pagination={{
                    onChange: (page) => {
                      console.log(page)
                    },
                    pageSize: 5,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                        }
                        title={<a href="https://ant.design">{item.title}</a>}
                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="내 정보" key="3">
                <Card
                  style={{
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                  }}>
                  <Divider>프로필</Divider>
                  <Row gutter={[16, 16]}>
                    <Col className="seconday_text" span={24}>
                      카카오계정에 등록한 프로필을 변겨하시려면 프로필을
                      수정하세요
                    </Col>
                  </Row>
                  <Row
                    gutter={[12, 12]}
                    align={"middle"}
                    justify={"center"}
                    style={{ textAlign: "center" }}>
                    <Col offset={0} span={24}>
                      <Avatar size={64} src={session?.user.image} />
                    </Col>
                    <Col offset={0} span={24}>
                      {session?.user.name}
                    </Col>
                  </Row>
                </Card>
              </TabPane>
            </Tabs>
          </StyledTabs>
        </Col>
      )}
    </Row>
  )
}

MyPage.Layout = MyPageTemplate

MyPage.getInitialProps = async (context) => {
  return {
    // @ts-ignore
    providers: await providers(),
    sidebar: false,
  }
}
export default MyPage
