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

export default memo(() => {
  const { profileUser, isProfile, isLogin } = useStoreInfo('profileUser', 'isProfile', 'isLogin')
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)
  let [currentMoments, setCurrentMoments] = useState([])
  setCurrentMoments = useCallback(setCurrentMoments, [])
  const [userId, setUserId] = useState(null)
  const [delDialogShow, setDelDialogShow] = useState(false)
  const [currentMoment, setCurrentMoment] = useState({})
  const [currentKey, setCurrentKey] = useState('pass')
  const [isEnd, setIsEnd] = useState(false)
  const { uid } = useParams()
  const num = useRef(pagenum)
  const idRef = useRef(userId)

  const reqMoment = async (uid) => {
    let result
    console.log(uid)
    if (isProfile) {
      result = await getMomentByUser(uid, num.current, pagesize, currentKey)
    } else {
      result = await getMomentByUser(uid, num.current, pagesize, 'pass')
    }
    const {
      data: { moments },
    } = result
    setCurrentMoments((m) => [...m, ...moments])
    setPagenum(num.current + 1)
    return moments
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
    content: '??????',
    fn: hidden,
  }

  const delBtn = (moment) => (
    <div onClick={() => showDialog(moment)} key="delete">
      <DeleteFilled />
      ??????
    </div>
  )
  const editBtn = (moment) => (
    <div className="editCollect" onClick={() => editMomentBtn(moment)} key="edit">
      <FormOutlined />
      ??????
    </div>
  )

  const editMomentBtn = (moment) => {
    window.location.href = `#/moment/edit/${moment.id}`
  }

  const tips = {
    title: '????????????',
    alert: '????????????????????????????????????',
  }

  const items = [
    {
      label: '?????????',
      key: 'pass',
    },
    {
      label: '?????????',
      key: 'await',
    },
    {
      label: '?????????',
      key: 'failed',
    },
  ]

  useEffect(() => {
    num.current = 1
    window.scrollTo(0, 0)
    idRef.current = parseInt(uid)
    reqMoment(idRef.current)
    setTimeout(() => {
      window.addEventListener('scroll', fn)
    }, 0)
    setUserId(idRef.current)
    setPagenum(num.current)
    setCurrentMoments([])
    return () => {
      setCurrentMoments([])
    }
  }, [uid, currentKey])

  return (
    <MomentsWrapper>
      <div className="people-header">
        {isProfile ? (
          items.map((item) => (
            <div
              className={item.key === currentKey ? 'head-active' : ''}
              key={item.key}
              onClick={() => {
                setCurrentKey(item.key)
              }}>
              {item.label}
            </div>
          ))
        ) : (
          <div className="head-active">{!profileUser?.gender ? '???' : '???'}?????????</div>
        )}
      </div>
      {currentMoments.length ? (
        currentMoments?.map((item) => (
          <MomentItem
            space={30}
            moment={item}
            key={item.id}
            setCurrentMoments={setCurrentMoments}
            hasType={!['await', 'failed'].includes(currentKey)}
            bottomBtn={isLogin && isProfile && [() => editBtn(item), () => delBtn(item)]}
          />
        ))
      ) : (
        <div className="empty">
          <Empty description="?????????????????????" />
        </div>
      )}
      {isEnd && currentMoments.length !== 0 && (
        <div className="Box">
          <Empty description="?????????????????????" />
        </div>
      )}
      {delDialogShow && isProfile ? (
        <DelDialog backContent={backContent} submitFn={delSubmitFn} tips={tips} />
      ) : null}
    </MomentsWrapper>
  )
})
