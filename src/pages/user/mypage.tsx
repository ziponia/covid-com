import React, { useState, useEffect } from "react"
import {
  providers,
  useSession,
  signOut,
  signIn,
  Session,
  getSession,
} from "next-auth/client"
import Link from "next/link"
import {
  Avatar,
  Row,
  Col,
  Card,
  Button,
  Tabs,
  Grid,
  List,
  Divider,
  Input,
  AutoComplete,
  Skeleton,
  Badge,
} from "antd"
import {
  LockOutlined,
  FieldTimeOutlined,
  HomeOutlined,
  CameraOutlined,
} from "@ant-design/icons"

import styled from "styled-components"
import { AppLayoutProps, AppPageProps } from "@covid/_app.interface"
import { useRouter } from "next/router"
import feedService, {
  ListFeedResponse,
  ListScrapResponse,
  ScrapWithUser,
} from "@covid/service/feed.service"
import htmlToString from "@covid/lib/htmlToString"
import commentService, {
  ListCommentResponse,
} from "@covid/service/comment.service"
import dayjs from "dayjs"
import AWS from "aws-sdk"
import { UploadChangeParam, UploadFile } from "antd/lib/upload/interface"
import userService, {
  UpdateUserInfoResponse,
} from "@covid/service/user.service"
import fileService from "@covid/service/file.service"
import { AnyARecord } from "dns"
import MyPageTemplate from "@covid/templates/MyPageTemplate"
import DefaultModal from "@covid/components/Modal"
import FileUpload from "@covid/components/FileUpload"

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
type Props = {
  session?: Session | null
}

const MyPage: AppPageProps<Props> = (props) => {
  const screens = useBreakpoint()
  const [session] = useSession()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const defaultName = session?.user.name
  const [userName, setUserName] = useState(defaultName || "")
  const [myFeeds, setMyFeeds] = useState<ListFeedResponse>()
  const [myFeedPage, setMyFeedPage] = useState(0)
  const [loadingMyFeed, setLoadingMyFeed] = useState(false)
  const [myComments, setMyComments] = useState<ListCommentResponse>()
  const [myCommentPage, setMyCommentPage] = useState(0)
  const [myScraps, setMyScraps] = useState<ListScrapResponse>()
  const [myScrapPage, setMyScrapPage] = useState(0)
  const [fileList, setFileList] = useState<UploadChangeParam>()

  const isMobileScreen = screens.xs && !screens.md

  useEffect(() => {}, [userName])

  const callback = (key: any) => {
    console.log(key)
  }

  const _signOut = () => {
    signOut({
      callbackUrl: "/",
    })
  }
  const onSave = async (name: string) => {
    try {
      const { data } = await userService.update({
        name,
      })
    } catch (e) {
      console.log("error", e)
    } finally {
    }
  }

  const editUserName = (e: any) => {
    const { value: changeName } = e.target
    setUserName(changeName)
  }

  const savaUserName = (e: any) => {
    const { value: changeName } = e.target
    if (defaultName !== changeName) {
      onSave(changeName)
    }
  }
  const showModal = () => {
    setVisible(true)
  }

  const onSaveProfileImage = async (image: any) => {
    try {
      const { data } = await userService.updateUserImage({
        image,
      })
    } catch (e) {
      console.log("error", e)
    } finally {
    }
  }

  const handleOk = async () => {
    try {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setVisible(true)
      }, 100)
      const response = await fileService.upload({
        files: fileList?.fileList,
      })
      setVisible(false)
      if (!response) {
        // 파일이 없을 경우... 처리
        return
      }

      const { data } = response
      onSaveProfileImage(data.accessUri)
    } catch (e) {
      console.log("error", e)
    } finally {
    }
  }

  const handleCancel = () => {
    setVisible(false)
    setFileList(undefined)
  }

  const 내가_쓴_글_리스트 = async (page: number) => {
    try {
      setLoadingMyFeed(true)
      const { data } = await feedService.list({
        authorId: session?.user.id,
        page,
      })
      setMyFeeds(data)
    } finally {
      setLoadingMyFeed(false)
    }
  }

  const 나의_코멘트_리스트 = async (page: number) => {
    try {
      const { data } = await commentService.list({
        userId: session?.user.id,
        _includeFeed: true,
      })
      setMyComments(data)
    } finally {
    }
  }

  const 나의_스크랩_리스트 = async (page: number) => {
    try {
      const { data } = await feedService.scrapList({
        authorId: session?.user.id,
        _includeFeed: true,
      })
      setMyScraps(data)
    } finally {
    }
  }
  useEffect(() => {
    내가_쓴_글_리스트(myFeedPage)
  }, [myFeedPage])

  useEffect(() => {
    나의_코멘트_리스트(myCommentPage)
  }, [myCommentPage])

  useEffect(() => {
    나의_스크랩_리스트(myScrapPage)
  }, [myScrapPage])

  return (
    <Row style={{ flex: 1 }}>
      <StyledContent screens={screens}>
        <div className="my_header">
          <Row style={{ padding: "24px" }}>
            <Col span={12}>
              <a href="/">
                <HomeOutlined style={{ fontSize: "24px", color: "#fff" }} />
              </a>
            </Col>
            <Col
              offset={!isMobileScreen ? 10 : 6}
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
                <Skeleton loading={loadingMyFeed}>
                  <List
                    itemLayout="horizontal"
                    dataSource={myFeeds?.items || []}
                    pagination={{
                      onChange: setMyFeedPage,
                      pageSize: 20,
                    }}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.author.image} />}
                          title={
                            <Link href={`/feed/${item.id}`}>
                              <a href={`/feed/${item.id}`}>{item.title}</a>
                            </Link>
                          }
                          description={htmlToString(item.content)}
                        />
                      </List.Item>
                    )}
                  />
                </Skeleton>
              </TabPane>
              <TabPane tab="내가 쓴 댓글" key="2">
                <List
                  itemLayout="horizontal"
                  dataSource={myComments?.items || []}
                  pagination={{
                    onChange: setMyCommentPage,
                    pageSize: 20,
                  }}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <time key="comment-create-at">
                          {dayjs(item.created_at).format("YYYY. MM. DD. hh:mm")}
                        </time>,
                      ]}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.user.image} />}
                        title={
                          <Link href={`/feed/${item.feed?.id}`}>
                            <a href={`/feed/${item.feed?.id}`}>
                              {item.content}
                            </a>
                          </Link>
                        }
                        description={item.feed?.title}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="스크랩" key="3">
                <List
                  itemLayout="horizontal"
                  dataSource={myScraps?.items || []}
                  pagination={{
                    onChange: setMyScrapPage,
                    pageSize: 20,
                  }}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <time key="comment-create-at">
                          {dayjs(item.created_at).format("YYYY. MM. DD. hh:mm")}
                        </time>,
                      ]}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.feed.author?.image} />}
                        title={
                          <Link href={`/feed/${item.feed?.id}`}>
                            <a href={`/feed/${item.feed?.id}`}>
                              {htmlToString(item.feed?.content)}
                            </a>
                          </Link>
                        }
                        description={item.feed?.title}
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="내 정보" key="4">
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
                      <a onClick={showModal}>
                        <Badge
                          count={
                            <CameraOutlined
                              style={{
                                color: "#fff",
                                backgroundColor: "#2db7f5",
                                padding: "8px",
                                borderRadius: "10px",
                              }}
                            />
                          }
                          offset={[-10, 100]}>
                          <Avatar size={120} src={session?.user.image} />
                        </Badge>
                      </a>
                      <DefaultModal
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        loading={loading}
                        title="프로필 이미지 변경">
                        <FileUpload
                          name="file"
                          multiple={false}
                          onChange={setFileList}
                          transformFile={undefined}
                          beforeUpload={() => true}
                        />
                      </DefaultModal>
                    </Col>
                    <Col offset={0} span={24}>
                      <Input
                        // defaultValue={session?.user.name}
                        value={userName}
                        placeholder="Basic usage"
                        onChange={editUserName}
                        onBlur={savaUserName}
                        style={{
                          border: "1px solid transparent",
                          width: "auto",
                          textAlign: "center",
                        }}
                      />
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

MyPage.getInitialProps = async (ctx) => {
  const session = await getSession(ctx)
  return {
    // @ts-ignore
    providers: await providers(),
    sidebar: false,
    session,
  }
}
export default MyPage
