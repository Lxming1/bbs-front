import { memo, React, useCallback, useEffect, useRef, useState } from 'react'
import { getMomentByUser } from '@/service/moment'
import { useParams } from 'react-router-dom'
import MomentsWrapper from './style'
import MomentItem from '@/pages/home/left/moment/momentItem'
import { Empty } from 'antd'
import { debounce } from '@/utils'
import { DeleteFilled, FormOutlined } from '@ant-design/icons'
import { delMoment } from '@/service/moment'
import { xmMessage } from '@/utils'
import DelDialog from '@/components/dialogs/delDialog'
import { useStoreInfo } from '@/hooks'
import { useDispatch } from 'react-redux'

export default memo(() => {
  const { profileUser, isProfile, isLogin } = useStoreInfo('profileUser', 'isProfile', 'isLogin')
  const dispatch = useDispatch()
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)
  let [currentMoments, setCurrentMoments] = useState([])
  setCurrentMoments = useCallback(setCurrentMoments, [])
  const [userId, setUserId] = useState(null)
  const [delDialogShow, setDelDialogShow] = useState(false)
  const [currentMoment, setCurrentMoment] = useState({})
  const [isEnd, setIsEnd] = useState(false)
  const { uid } = useParams()
  const num = useRef(pagenum)
  const idRef = useRef(userId)

  const reqMoment = async (uid) => {
    const result = await getMomentByUser(uid, num.current, pagesize).then(
      ({ data: { moments } }) => {
        setCurrentMoments((m) => [...m, ...moments])
        setPagenum(num.current + 1)
        return moments
      }
    )
    return result
  }

  useEffect(() => {
    num.current = pagenum
  }, [pagenum])

  const fn = debounce(async () => {
    const showHeight = window.innerHeight
    const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
    const allHeight = document.body.scrollHeight
    if (allHeight < showHeight + scrollTopHeight + 500) {
      const moment = await reqMoment(idRef.current)
      if (!moment.length) {
        window.removeEventListener('scroll', fn)
        setIsEnd(true)
      }
    }
  }, 100)

  const delSubmitFn = async () => {
    const result = await delMoment(currentMoment.id)
    xmMessage(result.code, result.message)
    setDelDialogShow(false)
    const momentId = result.data
    setCurrentMoments((moments) => moments.filter((item) => item.id !== parseInt(momentId)))
  }

  const showDialog = (moment) => {
    setCurrentMoment(moment)
    setDelDialogShow(true)
  }
  const hidden = () => setDelDialogShow(false)

  const backContent = {
    content: '取消',
    fn: hidden,
  }

  const delBtn = (moment) => (
    <div onClick={() => showDialog(moment)} key="delete">
      <DeleteFilled />
      删除
    </div>
  )
  const editBtn = (moment) => (
    <div className="editCollect" onClick={() => editMomentBtn(moment)} key="edit">
      <FormOutlined />
      编辑
    </div>
  )

  const editMomentBtn = (moment) => {
    window.location.href = `#/moment/edit/${moment.id}`
  }

  const tips = {
    title: '删除动态',
    alert: '你确认要删除这个动态吗？',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    idRef.current = parseInt(uid)
    reqMoment(idRef.current)
    setTimeout(() => {
      window.addEventListener('scroll', fn)
    }, 0)
    num.current = 1
    setUserId(idRef.current)
    setPagenum(num.current)
    setCurrentMoments([])
    return () => {
      setCurrentMoments([])
    }
  }, [uid])

  return (
    <MomentsWrapper>
      <div className="people-header">
        <div className="head-active">
          {isProfile ? '我' : !profileUser?.gender ? '他' : '她'}的动态
        </div>
      </div>
      {currentMoments.length ? (
        currentMoments?.map((item) => (
          <MomentItem
            space={30}
            moment={item}
            key={item.id}
            setCurrentMoments={setCurrentMoments}
            bottomBtn={isLogin && isProfile && [() => editBtn(item), () => delBtn(item)]}
          />
        ))
      ) : (
        <div className="empty">
          <Empty description="还没有发表动态" />
        </div>
      )}
      {isEnd && currentMoments.length !== 0 && (
        <div className="Box">
          <Empty description="没有更多动态啦" />
        </div>
      )}
      {delDialogShow && <DelDialog backContent={backContent} submitFn={delSubmitFn} tips={tips} />}
    </MomentsWrapper>
  )
})
