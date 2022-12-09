import { shallowEqual, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { debounce } from '../utils'
import { setMomentTotal, setMomentsAction } from '@/store/actionCreater/homeAction'
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
  const { plateId, user } = useStoreInfo('plateId', 'user')
  const pagesize = 10
  const num = useRef(pagenum)
  const dispatch = useDispatch()

  const reqMoment = async () => {
    const result = await dispatch(getMomentsAction(num.current, pagesize, user?.id))
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
  }, [plateId])

  useEffect(() => {
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
  }, [])
}
