import React, { useCallback, useEffect, useState } from "react"
import CommentInput from "@covid/components/Comment/CommentInput"
import CommentList from "@covid/components/Comment/CommentList"
import { useSession } from "next-auth/client"
import { Tooltip } from "antd"
import commentService, {
  ListCommentRequest,
  ListCommentResponse,
} from "@covid/service/comment.service"

import useDeepEffect from "use-deep-compare-effect"

const useComments = (options: ListCommentRequest) => {
  const [data, setData] = useState<ListCommentResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [lastUpdated, setLastUpdated] = useState<number>()

  const requestApi = useCallback(
    async (options) => {
      setError(undefined)
      setLoading(true)
      try {
        const { data } = await commentService.list(options)
        setData(data)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [options],
  )

  useDeepEffect(() => {
    requestApi(options)
  }, [options, lastUpdated])

  return {
    data,
    loading,
    error,
    refresh: () => setLastUpdated(new Date().getTime()),
  }
}

export type CommentProps = {
  feedId: number
}

const Comment: React.FC<CommentProps> = (props) => {
  const [session] = useSession()

  const [comment, setComment] = useState("")
  const [req, setReq] = useState({
    page: 1,
    size: 10,
  })

  const [loading, setLoading] = useState(false)
  const [tooltip, showTooltip] = useState(false)

  const { data, loading: commentLoading, refresh } = useComments({
    feedId: props.feedId,
    page: req.page,
    size: req.size,
  })

  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    showTooltip(false)
  }

  const onSubmit = useCallback(async () => {
    if (comment.length === 0) {
      showTooltip(true)
      return
    }
    setLoading(true)
    await commentService.create({
      feedId: props.feedId,
      content: comment,
    })
    setReq({
      ...req,
      page: 1,
    })

    if (req.page === 1) {
      refresh()
    }
    setLoading(false)
    setComment("")
  }, [props.feedId, comment])

  const onPageChange = (page: number) => {
    setReq({ ...req, page })
  }

  const onUpdateComplete = async (commentId: string, content: string) => {
    await commentService.update({
      content,
      commentId,
    })
    refresh()
  }

  const onDeleteComplete = async (commentId: string) => {
    const { data } = await commentService.remove({ commentId })
    refresh()
  }

  return (
    <>
      <Tooltip
        title="댓글을 작성 해주세요"
        visible={tooltip}
        style={{ fontSize: 12 }}>
        <CommentInput
          value={comment}
          loading={loading}
          onChange={onChangeInput}
          disabled={!session || comment.length === 0}
          onSubmit={onSubmit}
        />
      </Tooltip>
      <CommentList
        total={data?.meta.totalElements || 0}
        comments={data?.items || []}
        loading={commentLoading}
        currentUserId={session?.user.id}
        feedId={props.feedId}
        onChangePage={onPageChange}
        pagesize={req.size}
        onUpdateComplete={onUpdateComplete}
        onDeleteComplete={onDeleteComplete}
      />
    </>
  )
}

export default Comment
