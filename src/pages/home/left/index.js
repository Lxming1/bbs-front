import HeadMenu from './menus'
import LeftWrapper from './style'
import { getPlates } from '@/store/actionCreater/homeAction'
import BackTop from '@/components/backTop'
import Moments from './moment'
import { setMomentsAction, setMomentTotal } from '@/store/actionCreater/homeAction'
import { useDispatch } from 'react-redux'
import { useStoreInfo } from '@/hooks'
import { memo, useCallback, useEffect, useState, useRef } from 'react'
import { debounce } from '@/utils'
import { getMomentsAction } from '@/store/actionCreater/homeAction'

export default memo(() => {
  const dispatch = useDispatch()
  const { moments, momentTotal } = useStoreInfo('moments', 'momentTotal')

  let [currentMoments, setCurrentMoments] = useState(moments)
  setCurrentMoments = useCallback(setCurrentMoments, [])
  const [pagenum, setPagenum] = useState(1)
  const { plateId } = useStoreInfo('plateId')
  const pagesize = 10
  const num = useRef(pagenum)
  useEffect(() => {
    setCurrentMoments(moments)
  }, [moments])

  useEffect(() => {
    dispatch(setMomentsAction(currentMoments))
  }, [currentMoments])

  const reqMoment = async () => {
    const result = await dispatch(getMomentsAction(num.current, pagesize))
    setPagenum(num.current + 1)
    return result
  }
  useEffect(() => {
    num.current = pagenum
  }, [pagenum])

  useEffect(() => {
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
      dispatch(setMomentsAction([]))
      dispatch(setMomentTotal(0))
    }
  }, [plateId])

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getPlates())
  }, [])

  return (
    <LeftWrapper>
      <HeadMenu />
      <Moments
        moments={moments}
        setCurrentMoments={setCurrentMoments}
        isEnd={momentTotal === moments.length}
      />
      <BackTop />
    </LeftWrapper>
  )
})
