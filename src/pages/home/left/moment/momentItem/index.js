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
import { praiseMoment, cancelPraiseMoment } from '@/service/moment'
import { MomentItemWrapper } from './style'
import { setMomentsAction } from '@/store/actionCreater/homeAction'
import { getCommentList } from '@/service/comment'
import { handlLogin, debounce } from '@/utils'
import Comment from './comment'
import Collect from './collect'
import { Image } from 'antd'

const MomentItem = memo(({ moment, setCurrentMoments, bottomBtn, space = 50 }) => {
  const { user } = useStoreInfo('user')
  const [isOpen, setIsOpen] = useState(false)
  const [commentOpen, setCommentOpen] = useState(false)
  const [total, setTotal] = useState(0)
  const [comments, setComments] = useState([])
  const [firstOpen, setFirstOpen] = useState(true)
  let [showCollect, setShowCollect] = useState(false)
  const [isPraise, setIsPraise] = useState(moment.isPraise)

  setShowCollect = useCallback(setShowCollect, [])
  const getComments = useCallback(async () => {
    const {
      data: { total, comments: commentList },
    } = await getCommentList(moment.id)
    setComments(commentList)
    setTotal(total)
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

  const seePeoplePage = () => {
    if (moment.visible === 0) {
      window.location.href = `#/people/${moment.author.id}`
    }
  }

  const openComment = () => {
    handlLogin(user)
    setCommentOpen(!commentOpen)
  }

  const praise = async () => {
    const result = isPraise ? await cancelPraiseMoment(moment.id) : await praiseMoment(moment.id)
    let { praiseCount, momentId } = result.data
    momentId = parseInt(momentId)
    setCurrentMoments((moments) => {
      return moments.map((item) => {
        if (item.id === momentId) {
          item.praiseCount = praiseCount
          item.isPraise = !item.isPraise
          setIsPraise(item.isPraise)
        }
        return item
      })
    })
  }

  return (
    <MomentItemWrapper space={space}>
      <div className="title">{moment.title}</div>
      {!isOpen ? (
        moment?.images === null ? (
          <div className="contentBox" onClick={() => setIsOpen(true)}>
            <div className="content hiddenContent">
              {moment.author.name}：{moment.content} <span className="seize"></span>
            </div>
            <div className="openContent" onClick={changeState}>
              阅读全文 <DownOutlined />
            </div>
          </div>
        ) : (
          <div className="hasPicBox" onClick={() => setIsOpen(true)}>
            <div className="img">
              <img src={moment?.images?.[0] + '?type=small'} alt="" />
            </div>
            <div className="hasPicContent">
              <div className="content hiddenContent">
                {moment.author.name}：{moment.content} <span className="seize"></span>
              </div>
            </div>
          </div>
        )
      ) : (
        <>
          <div
            className="author"
            style={moment.visible === 0 ? { cursor: 'pointer' } : null}
            onClick={seePeoplePage}>
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
          {moment?.images !== null && (
            <div className="picture">
              <Image.PreviewGroup>
                {moment?.images?.map((item, index) => (
                  <div className="imgBox" key={item + index}>
                    <Image src={`${item}?type=small`} preview={{ src: item }} />
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          )}
          <div className="createTime">{time(moment)}</div>
        </>
      )}
      <div className="bottomBtn">
        <div
          onClick={debounce(praise, 300, true)}
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
        <div onClick={() => setShowCollect((state) => !state)}>
          <StarFilled /> 收藏
        </div>
        {bottomBtn?.map((item) => item())}
        {isOpen && (
          <div className="closeContent" onClick={changeState}>
            收起 <UpOutlined />
          </div>
        )}
      </div>
      {commentOpen && (
        <Comment comments={comments} total={total} momentId={moment.id} getComments={getComments} />
      )}
      {showCollect && <Collect setShowCollect={setShowCollect} momentId={moment.id} />}
    </MomentItemWrapper>
  )
})
export default MomentItem
