import { memo, useRef, useState } from 'react'
import { delNotice } from '@/service/notices'
import NoticeItemWrapper from './style'
import { Input } from 'antd'
import dayjs from 'dayjs'
import { DeleteOutlined, LikeFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import RelationBtn from '@/components/relationBtn'
import { xmMessage, debounce } from '@/utils'
import { cancelPraiseComment, praiseComment, replyComment } from '@/service/comment'

export default memo(({ type, notice, reqFn, setNoticeList }) => {
  const [commentValue, setCommentValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const status = useRef(notice.status)

  const praise = async () => {
    notice.isPraise
      ? await cancelPraiseComment(notice.content.id, notice.moment.id)
      : await praiseComment(notice.content.id, notice.moment.id)
    setNoticeList((notices) =>
      notices.map((item) => {
        if (item.content.id === notice.content.id) {
          item.isPraise = !item.isPraise
        }
        return item
      })
    )
  }

  const replyBtn = (
    <>
      <div className="button" onClick={() => setIsOpen((open) => !open)}>
        <MessageOutlined />
        回复
      </div>
      <div
        className={`button ${notice.isPraise ? 'isPraise' : ''}`}
        onClick={debounce(praise, 300, true)}>
        {notice.isPraise ? <LikeFilled /> : <LikeOutlined />}
        {`${notice.isPraise ? '已' : ''}点赞`}
      </div>
    </>
  )

  const actionMapping = {
    praise: {
      content: '赞了我的',
      btn: null,
    },
    follow: {
      content: '关注了我',
      btn: null,
    },
    reply: {
      content: '回复了我的',
      btn: replyBtn,
    },
  }

  const send = async () => {
    if (commentValue.trim() === '') return
    const result = await replyComment(notice.content.id, commentValue, notice.moment.id)
    setCommentValue('')
    setIsOpen(false)
    xmMessage(result.code, result.message)
  }

  const userPage = (id) => {
    window.location.href = `#/people/${id}`
  }

  const action = actionMapping[type].content

  const delNoticeBtn = async (id) => {
    const result = await delNotice(id)
    xmMessage(result.code, result.message)
    reqFn()
  }

  return (
    <NoticeItemWrapper>
      <div className="item">
        <div className="left">
          {status.current === 0 && <div className="spot" />}
          <div className="leftAvatar" onClick={() => userPage(notice?.author?.id)}>
            <img src={notice?.author?.avatarUrl} alt="" />
          </div>
          <div className="leftDesc">
            <div className="nameHeader">
              <div className="name" onClick={() => userPage(notice?.author?.id)}>
                {notice?.author?.name}
              </div>
              <div className="action">
                {action}
                {notice?.moment !== null && (notice?.comment !== null ? '评论' : '动态')}
              </div>
            </div>
            {notice?.content?.id && (
              <div className="content text-nowrap">{notice?.content?.content}</div>
            )}
            <div className="noticeBottom">
              <div className="time">{dayjs(notice.createTime).format('YYYY年MM月DD日 HH:mm')}</div>
              {actionMapping[type].btn}
              <div className="button hidden" onClick={() => delNoticeBtn(notice.id)}>
                <DeleteOutlined />
                删除该通知
              </div>
            </div>
          </div>
        </div>
        {type !== 'follow' ? (
          <div
            className="right"
            onClick={() => (window.location.href = `#/moment/${notice?.moment.id}`)}>
            {notice?.moment?.images?.length ? (
              <img src={`${notice?.moment?.images?.[0]}?type=small`} alt="" />
            ) : (
              notice?.content?.id ?? notice?.moment?.title
            )}
          </div>
        ) : (
          <div className="followBtn">
            <RelationBtn
              relation={notice?.author?.relation}
              peopleInfo={notice?.author}
              newRelation={reqFn}
            />
          </div>
        )}
      </div>

      {type === 'reply' && isOpen && (
        <div className="replyInput">
          <Input
            placeholder="评论千万条，友善第一条"
            size="large"
            bordered={false}
            className="Input"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <button
            className={'sendBtn ' + (commentValue.length ? '' : 'disableBtn')}
            onClick={send}
            disabled={!commentValue.length}>
            发布
          </button>
        </div>
      )}
    </NoticeItemWrapper>
  )
})
