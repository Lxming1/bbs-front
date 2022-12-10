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
  const { moments } = useStoreInfo('moments')

  let [currentMoments, setCurrentMoments] = useState(moments)
  let [userList, setUserList] = useState([])
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
      setUserList((userList) => [...userList, ...result.data.followList])
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
    <SearchWrapper>
      <HeadMenu />
      {type === 'moment' && <Moments moments={moments} setCurrentMoments={setCurrentMoments} />}
      {type === 'user' && <UserList setUserList={setUserList} userList={userList} />}
      <UserList setUserList={setUserList} userList={userList} />
      <BackTop />
    </SearchWrapper>
  )
})
