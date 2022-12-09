import { memo, useEffect, useRef, useState } from 'react'
import { Empty, Input } from 'antd'
import { useStoreInfo } from '@/hooks'
import CommentWrapper from './style'
import { xmMessage } from '@/utils'
import { createComment } from '@/service/comment'
import CommentItem from './commentItem'

export default memo(({ comments, total, momentId, getComments }) => {
  const { user } = useStoreInfo('user')
  const [commentContent, setCommentContent] = useState('')
  const ref = useRef(null)

  const send = async () => {
    if (commentContent.trim() === '') return
    const result = await createComment(commentContent, momentId)
    setCommentContent('')
    xmMessage(result.code, result.message)
    getComments()
  }

  return (
    <CommentWrapper ref={ref}>
      <div className="header">
        <img src={user?.avatar_url} alt="" className="avatar" />
        <div className="inputGroup">
          <Input
            placeholder="评论千万条，友善第一条"
            size="large"
            bordered={false}
            className="Input"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button
            className={'sendBtn ' + (commentContent.length ? '' : 'disableBtn')}
            onClick={send}
            disabled={!commentContent.length}>
            发布
          </button>
        </div>
      </div>
      <div className="main">
        <div className="mainHeader">{total}条评论</div>
        {comments?.length ? (
          <div className="mainComment">
            {comments?.map((item) => {
              let children = []
              if (item.children) {
                const getChildren = (item) => {
                  if (!item.children) return
                  item.children.forEach((item, index) => {
                    children.push(item)
                    return getChildren(item)
                  })
                }
                getChildren(item)
              }
              children.sort((a, b) => {
                const transTime = (time) => new Date(time).getTime()
                const aTime = transTime(a.createTime)
                const bTime = transTime(b.createTime)
                return aTime - bTime
              })
              return (
                <div key={item.id}>
                  <CommentItem comment={item} momentId={momentId} getComments={getComments} />
                  {children?.map((cItem) => {
                    const name = children?.find((item1) => item1.id === cItem.commentId)?.author
                      ?.name
                    return (
                      <CommentItem
                        comment={cItem}
                        momentId={momentId}
                        name={name}
                        key={cItem.id}
                        getComments={getComments}
                      />
                    )
                  })}
                </div>
              )
            })}
          </div>
        ) : (
          <div style={{ padding: '20px 0' }}>
            <Empty description={'暂无评论'} />
          </div>
        )}
      </div>
    </CommentWrapper>
  )
})
