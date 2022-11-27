import { shallowEqual, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from '../utils'
import { setMomentTotal, setPlateId, setMomentsAction } from '@/store/actionCreater/homeAction'
import { getMomentsAction } from '../store/actionCreater/homeAction'

export const useStoreInfo = (...props) => {
  const state = useSelector(
    (state) =>
      props.reduce((pre, value) => {
        pre[value] = state.get(value)
        return pre
      }, {}),
    shallowEqual
  )

  return state
}

export const useLazyLoad = () => {
  const [pagenum, setPagenum] = useState(1)
  const { moments, momentTotal, plateId } = useStoreInfo('moments', 'momentTotal', 'plateId')
  const pagesize = 10
  const num = useRef(pagenum)
  const dispatch = useDispatch()
  const [firstLoad, setFirstLoad] = useState(true)

  const reqMoment = async () => {
    await dispatch(getMomentsAction(num.current, pagesize))
    setPagenum(num.current + 1)
  }

  useEffect(() => {
    num.current = pagenum
  }, [pagenum])

  useEffect(() => {
    // if (firstLoad) return setFirstLoad(false)
    num.current = 1
    setPagenum(num.current)
    reqMoment()
  }, [plateId])

  useEffect(() => {
    return () => {
      dispatch(setMomentsAction([]))
      dispatch(setMomentTotal(0))
    }
  }, [])

  useEffect(() => {
    const scrollFn = debounce(() => {
      const showHeight = window.innerHeight
      const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
      const allHeight = document.body.scrollHeight
      if (allHeight < showHeight + scrollTopHeight + 500) {
        if (moments === momentTotal && momentTotal !== 0) {
          window.removeEventListener('scroll', scrollFn)
        }
        reqMoment()
      }
    }, 100)
    window.addEventListener('scroll', scrollFn)
    return () => {
      window.removeEventListener('scroll', scrollFn)
    }
  }, [])
}
