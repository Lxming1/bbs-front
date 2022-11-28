import {
  CaretUpFilled,
  DownOutlined,
  MessageFilled,
  StarFilled,
  UpOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useStoreInfo } from '@/hooks'
import { praiseMoment } from '@/service/moment'
import { MomentItemWrapper } from './style'
import { cancelPraiseMoment } from '@/service/moment'
import { throttle } from '@/utils'
import { setMomentsAction } from '@/store/actionCreater/homeAction'
import { getCommentList } from '@/service/comment'
import Comment from './comment'
import _ from 'lodash'
import { debounce, debounce_2, promiseDebounce, test, xmMessage } from '../../../../../utils'
import { useNavigate } from 'react-router-dom'

const MomentItem = memo(({ moment, setPraiseList, isPraise }) => {
  const { user } = useStoreInfo('user')
  const [isOpen, setIsOpen] = useState(false)
  const [commentOpen, setCommentOpen] = useState(false)
  // const [lock, setLock] = useState(false)
  const { moments } = useStoreInfo('moments')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [total, setTotal] = useState(0)
  const [comments, setComments] = useState([])
  const [firstOpen, setFirstOpen] = useState(true)
  const [momentPraise, setMomentPraise] = useState([])
  const getComments = useCallback(async () => {
    const {
      data: { total, comments: commentList, praiseList },
    } = await getCommentList(moment.id, user.id)
    setComments(commentList)
    setTotal(total)
    setMomentPraise(praiseList)
  })

  useEffect(() => {
    if (commentOpen && firstOpen) {
      getComments()
      setFirstOpen(false)
    }
  }, [commentOpen])

  const changeState = () => {
    setIsOpen(!isOpen)
  }

  const time = (moment) => {
    const transTime = (time) => new Date(time).getTime()
    const updateTime = transTime(moment.updateTime)
    const createTime = transTime(moment.createTime)
    const mes = updateTime > createTime ? '编辑于 ' : '发布于 '
    const date = dayjs(moment.createTime).format('YYYY-MM-DD hh:ss')
    return mes + date
  }

  const openComment = () => {
    if (user === null) {
      xmMessage(2, '请先登录')
      navigate('/login')
    }
    setCommentOpen(!commentOpen)
  }

  const praise = async (id) => {
    const result = isPraise ? await cancelPraiseMoment(id) : await praiseMoment(id)
    let { praiseCount, momentId } = result.data
    momentId = parseInt(momentId)
    const newMoments = moments.map((item) => {
      if (item.id === moment.id) {
        item.praiseCount = praiseCount
      }
      return item
    })
    dispatch(setMomentsAction(newMoments))
    if (isPraise) {
      setPraiseList((praiseList) => {
        const index = praiseList.findIndex((item) => item === momentId)
        const newPraiseList = [...praiseList]
        delete newPraiseList[index]
        return newPraiseList.filter(Boolean)
      })
    } else {
      setPraiseList((praiseList) => [...praiseList, momentId])
    }
  }

  return (
    <MomentItemWrapper>
      <div className="title">{moment.title}</div>
      {!isOpen ? (
        <div className="contentBox" onClick={() => setIsOpen(true)}>
          <div className="content hiddenContent">
            {moment.author.name}：{moment.content} <span className="seize"></span>
          </div>
          <div className="openContent" onClick={changeState}>
            阅读全文 <DownOutlined />
          </div>
        </div>
      ) : (
        <>
          <div className="author">
            <div className="avatar">
              <img src={moment.author.avatar_url} alt="" />
            </div>
            <div className="name">{moment.author.name}</div>
            {moment.author.introduction && (
              <div className="introduction">，{moment.author.introduction}</div>
            )}
          </div>
          <div className="praise" style={{ color: '#121212' }}>
            {moment.praiseCount}人赞同了该动态
          </div>
          <div className="content">{moment.content}</div>
          <div className="createTime">{time(moment)}</div>
        </>
      )}
      <div className="bottomBtn">
        <div
          onClick={() => praise(moment.id)}
          className={`${isPraise ? 'praiseBtn-active ' : ' '} praiseBtn`}>
          <CaretUpFilled />
          {isPraise ? '已赞同' : '赞同'} {!moment.praiseCount ? '' : moment.praiseCount}
        </div>
        <div onClick={openComment}>
          <MessageFilled />
          {commentOpen
            ? '收起评论'
            : !moment.commentCount
            ? '添加评论'
            : `${moment.commentCount}条评论`}
        </div>
        <div>
          <StarFilled /> 收藏
        </div>
        {isOpen && (
          <div className="closeContent" onClick={changeState}>
            收起 <UpOutlined />
          </div>
        )}
      </div>
      {commentOpen && (
        <Comment comments={comments} total={total} momentId={moment.id} getComments={getComments} />
      )}
    </MomentItemWrapper>
  )
})
export default MomentItem
