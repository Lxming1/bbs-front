import { React, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMomentsAction } from '../../../store/actionCreater/homeAction'
import Moments from './cpns/moment'
import HeadMenu from './cpns/headMenu'
import LeftWrapper from './style'
import { getPlates } from '../../../store/actionCreater/homeAction'
import { debounce } from '../../../utils'
import { useStoreInfo } from '../../../hooks'

export default () => {
  const pagesize = 10
  const total = useStoreInfo('momentTotal')
  const moments = useStoreInfo('moments')
  const dispatch = useDispatch()
  const [pagenum, setPagenum] = useState(1)
  const num = useRef(pagenum)

  const scrollFn = debounce(() => {
    const showHeight = window.innerHeight
    const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop
    const allHeight = document.body.scrollHeight
    if (allHeight < showHeight + scrollTopHeight) {
      if (moments.length === total && total !== 0) {
        window.removeEventListener('scroll', scrollFn)
      }
      reqMoment()
    }
  }, 100)

  const reqMoment = () => {
    dispatch(getMomentsAction(num.current, pagesize))
    setPagenum(num.current + 1)
  }

  useEffect(() => {
    num.current = pagenum
  }, [pagenum])

  useEffect(() => {
    dispatch(getPlates())
    reqMoment()
    window.addEventListener('scroll', scrollFn)
    return () => {
      window.removeEventListener('scroll', scrollFn)
    }
  }, [])

  return (
    <LeftWrapper>
      <HeadMenu />
      <Moments />
    </LeftWrapper>
  )
}
