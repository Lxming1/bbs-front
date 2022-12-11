import SearchWrapper from './style'
import HeadMenu from './menus'
import { getPlates } from '@/store/actionCreater/homeAction'
import BackTop from '@/components/backTop'
import { setMomentsAction, setMomentTotal } from '@/store/actionCreater/homeAction'
import { useDispatch } from 'react-redux'
import { useStoreInfo } from '@/hooks'
import { memo, useCallback, useEffect, useState, useRef } from 'react'
import { debounce } from '@/utils'
import { getMomentsAction } from '@/store/actionCreater/homeAction'
import { useParams } from 'react-router-dom'
import Moments from '../left/moment'
import { getMomentBySearch } from '../../../store/actionCreater/homeAction'
import { searchUser } from '../../../service/users'
import UserList from '@/components/userList'

export default memo(() => {
  const dispatch = useDispatch()
  const { moments, momentTotal } = useStoreInfo('moments', 'momentTotal')

  let [currentMoments, setCurrentMoments] = useState(moments)
  let [userList, setUserList] = useState([])
  const [userTotal, setUserTotal] = useState(0)
  setCurrentMoments = useCallback(setCurrentMoments, [])
  setUserList = useCallback(setUserList, [])
  const [pagenum, setPagenum] = useState(1)
  const pagesize = 10
  const num = useRef(pagenum)

  useEffect(() => {
    setCurrentMoments(moments)
  }, [moments])

  useEffect(() => {
    dispatch(setMomentsAction(currentMoments))
  }, [currentMoments])

  const { type, value } = useParams()

  const reqMoment = async () => {
    if (type === 'moment') {
      const result = await dispatch(getMomentBySearch(num.current, pagesize, value))
      setPagenum(num.current + 1)
      return result
    } else if (type === 'user') {
      const result = await searchUser(value, num.current, pagesize)
      setPagenum(num.current + 1)
      setUserTotal(result.data.total)
      setUserList((users) => [...users, ...result.data.followList])
      return result
    }
  }

  useEffect(() => {
    num.current = pagenum
  }, [pagenum])
  useEffect(() => {
    setUserList([])
    dispatch(setMomentsAction([]))
    dispatch(setMomentTotal(0))
    num.current = 1
    setPagenum(num.current)
    reqMoment()
    const scrollFn = debounce(async () => {
      const showHeight = window.innerHeight
      const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
      const allHeight = document.body.scrollHeight
      if (allHeight < showHeight + scrollTopHeight + 500) {
        const result = await reqMoment()
        if (!result?.length) {
          window.removeEventListener('scroll', scrollFn)
        }
      }
    }, 100)
    window.addEventListener('scroll', scrollFn)
    return () => {
      window.removeEventListener('scroll', scrollFn)
      setUserList([])
      dispatch(setMomentsAction([]))
      dispatch(setMomentTotal(0))
    }
  }, [value, type])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPlates())
  }, [])

  return (
    <SearchWrapper className="boxShadow">
      <HeadMenu />
      {type === 'moment' && (
        <Moments
          moments={moments}
          setCurrentMoments={setCurrentMoments}
          desc={`未找到标题或内容包含'${value}'的动态`}
          isEnd={momentTotal === moments.length}
        />
      )}
      {type === 'user' && (
        <div style={{ minHeight: 'calc(100vh - 140px)' }}>
          <UserList
            setUserList={setUserList}
            userList={userList}
            desc={`未找到昵称包含'${value}'的用户`}
            isEnd={userTotal === userList.length}
          />
        </div>
      )}
      <BackTop />
    </SearchWrapper>
  )
})
