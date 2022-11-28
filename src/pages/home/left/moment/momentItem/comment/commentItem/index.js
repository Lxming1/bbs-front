import Search from 'antd/lib/transfer/search'
import { replyComment } from '@/service/comment'
import { MessageFilled, LikeFilled, CaretRightOutlined } from '@ant-design/icons'
import { memo, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import CommentItemWrapper from './style'
import { Input } from 'antd'
import { handleDate, xmMessage } from '@/utils'
import { praiseComment, cancelPraiseComment } from '@/service/comment'

export default memo(({ comment, momentId, name, getComments }) => {
  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isPraise, setisPraise] = useState(false)
  console.log(comment)

  const sendInput = async (id) => {
    if (content.trim() === '') return
    const result = await replyComment(id, content, momentId)
    setContent('')
    setIsOpen(false)
    xmMessage(result.code, result.message)
    getComments()
  }

  const praise = async (id) => {
    isPraise
      ? await cancelPraiseComment(comment.id, momentId)
      : await praiseComment(comment.id, momentId)
    setisPraise(!isPraise)
    getComments()
  }

  return (
    <CommentItemWrapper>
      <div
        className="item"
        style={comment.commentId !== null ? { paddingLeft: '54px' } : null}
        key={comment.id}>
        <img src={comment.author.avatar_url} alt="" className="leftAvatar" />
        <div className="rightContent">
          <div className="username">
            {comment.author.name}
            {name && (
              <>
                <CaretRightOutlined />
                {name}
              </>
            )}
          </div>
          <div className="content">{comment.content}</div>
          <div className="bottom">
            <span className="time">{handleDate(comment.createTime)}</span>
            <div className="btn">
              <div onClick={() => setIsOpen(!isOpen)}>
                <MessageFilled />
                回复
              </div>
              <div onClick={praise} className={isPraise ? 'isPraise' : ''}>
                <LikeFilled style={{ fontSize: '15px' }} />
                {comment.praiseCount !== 0 ? comment.praiseCount : '赞'}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="inputGroup">
              <Input
                placeholder={`回复 ${comment.author.name}`}
                size="large"
                bordered={false}
                className="commentInput"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div
                className={'sendBtn ' + (content.length ? '' : 'disableBtn')}
                onClick={() => sendInput(comment.id)}>
                发布
              </div>
            </div>
          )}
        </div>
      </div>
    </CommentItemWrapper>
  )
})
