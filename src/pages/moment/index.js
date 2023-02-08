import { memo, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { cancelPraiseMoment, getMoment, praiseMoment } from '../../service/moment'
import MomentWrapper from './style'
import RelationBtn from '@/components/relationBtn'
import { Image } from 'antd'
import dayjs from 'dayjs'
import { debounce, verifyLogin } from '../../utils'
import { useStoreInfo } from '@/hooks'
import { CaretUpFilled, MessageFilled, StarFilled } from '@ant-design/icons'
import Collect from '../home/left/moment/momentItem/collect'
import Comment from '../home/left/moment/momentItem/comment'
import { getCommentList } from '@/service/comment'

export default memo(() => {
  const { user, isLogin } = useStoreInfo('user', 'isLogin')

  const { momentId } = useParams()

  const [moment, setMoment] = useState(null)
  const [comments, setComments] = useState(null)

  let [showCollect, setShowCollect] = useState(false)

  const getComments = useCallback(async (id) => {
    const {
      data: { total, comments: commentList },
    } = await getCommentList(id)
    setComments(commentList)
    setMoment((moment) => {
      moment.commentCount = total
      return moment
    })
  })

  const time = () => {
    const transTime = (time) => new Date(time).getTime()
    const updateTime = transTime(moment?.updateTime)
    const createTime = transTime(moment?.createTime)
    const flag = updateTime > createTime
    const mes = flag ? '编辑于 ' : '发布于 '
    const date = dayjs(flag ? updateTime : createTime).format('YYYY-MM-DD HH:mm')
    return mes + date
  }

  const praise = async () => {
    await verifyLogin(isLogin)
    moment.isPraise ? await cancelPraiseMoment(moment.id) : await praiseMoment(moment.id)
    reqFn()
  }
  const showDialog = async () => {
    await verifyLogin(isLogin)
    setShowCollect((state) => !state)
  }

  const reqFn = async () => {
    const { data: moment } = await getMoment(momentId)
    setMoment(moment)
    getComments(moment.id)
  }
  const newRelation = () => reqFn()
  useEffect(() => {
    reqFn()
  }, [])
  return (
    <MomentWrapper className="boxShadow">
      <div className="title">{moment?.title}</div>
      <div className="user">
        <div className="userLeft">
          <img src={moment?.author?.avatar_url} alt="" />
          <span>{moment?.author?.name}</span>
        </div>
        <div className="userRight">
          <RelationBtn
            newRelation={newRelation}
            relation={moment?.author?.relation}
            peopleInfo={moment?.author}
          />
        </div>
      </div>
      <a className="praise" style={{ color: '#121212' }}>
        {moment?.praiseCount}人赞同了该动态
      </a>
      <div className="content">{moment?.content}</div>
      {moment?.images?.length && (
        <div className="images">
          <Image.PreviewGroup>
            {moment?.images?.map((item, index) => (
              <div className="imgBox" key={item + index}>
                <Image src={item} key={item + index} />
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      )}
      <div className="time">{time()}</div>
      <div className="plate">
        <a href={`#/${moment?.plate.id}`} className="plateBtn">
          {moment?.plate?.name}
        </a>
      </div>

      <div className="bottomBtn">
        <div
          onClick={debounce(praise, 300, true)}
          className={`${moment?.isPraise ? 'praiseBtn-active ' : ' '} praiseBtn`}>
          <CaretUpFilled />
          {moment?.isPraise ? '已赞同' : '赞同'} {!moment?.praiseCount ? '' : moment?.praiseCount}
        </div>
        <div>
          <MessageFilled />
          {moment?.commentCount}条评论
        </div>
        <div onClick={showDialog}>
          <StarFilled /> 收藏
        </div>
      </div>
      <Comment
        comments={comments}
        total={moment?.commentCount}
        momentId={moment?.id}
        getComments={() => getComments(moment?.id)}
      />
      {showCollect && <Collect setShowCollect={setShowCollect} momentId={moment?.id} />}
    </MomentWrapper>
  )
})
