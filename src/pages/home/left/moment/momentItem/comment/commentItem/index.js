import Search from 'antd/lib/transfer/search'
import { replyComment } from '@/service/comment'
import {
  MessageFilled,
  LikeFilled,
  CaretRightOutlined,
  EllipsisOutlined,
  DeleteFilled,
} from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import CommentItemWrapper from './style'
import { Input, Popover } from 'antd'
import { handleDate, xmMessage } from '@/utils'
import { praiseComment, cancelPraiseComment, delelteComment } from '@/service/comment'
import { debounce } from '@/utils'

export default memo(({ comment, moment, name, getComments }) => {
  const { user } = useStoreInfo('user')
  const [content, setContent] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const sendInput = async (id) => {
    if (content.trim() === '') return
    const result = await replyComment(id, content, moment.id)
    setContent('')
    setIsOpen(false)
    xmMessage(result.code, result.message)
    getComments()
  }

  const delComment = async () => {
    const result = await delelteComment(comment.id, moment.id)
    xmMessage(result.code, result.message)
    getComments()
  }

  const rightMenu = () => (
    <div className="rightMenu">
      <ul>
        <li onClick={delComment}>
          <span>删除</span>
        </li>
      </ul>
    </div>
  )

  const praise = async () => {
    comment.isPraise
      ? await cancelPraiseComment(comment.id, moment.id)
      : await praiseComment(comment.id, moment.id)
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
          <div className="rightHeader">
            <div className="username">
              {comment.author.name}
              {name && (
                <>
                  <CaretRightOutlined />
                  {name}
                </>
              )}
            </div>
            <Popover placement="bottom" className="rightMenu" content={rightMenu()} trigger="click">
              {[comment?.author?.id, moment?.author?.id].includes(user?.id) && <EllipsisOutlined />}
            </Popover>
          </div>
          <div className="content">
            {comment.content !== null ? (
              comment.content
            ) : (
              <span style={{ color: '#999aaa' }}>该评论已被屏蔽</span>
            )}
          </div>
          <div className="bottom">
            <span className="time">{handleDate(comment.createTime)}</span>
            <div className="btn">
              {comment.content !== null && (
                <>
                  <div onClick={() => setIsOpen(!isOpen)}>
                    <MessageFilled />
                    回复
                  </div>
                  <div
                    onClick={debounce(praise, 300, true)}
                    className={comment.isPraise ? 'isPraise' : ''}>
                    <LikeFilled style={{ fontSize: '15px' }} />
                    {comment.praiseCount !== 0 ? comment.praiseCount : '赞'}
                  </div>
                </>
              )}
            </div>
          </div>
          {isOpen && (
            <div className="inputGroup">
              <Input
                placeholder={`回复 ${comment.author.name}`}
                size="large"
                bordered={false}
                className="Input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                className={'sendBtn ' + (content.length ? '' : 'disableBtn')}
                onClick={() => sendInput(comment.id)}
                disabled={!content.length}>
                发布
              </button>
            </div>
          )}
        </div>
      </div>
    </CommentItemWrapper>
  )
})
