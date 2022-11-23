import { React, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMomentsAction } from '../../../store/actionCreater/homeAction'
import Moments from './cpns/moment'
import HeadMenu from './cpns/headMenu'
import LeftWrapper from './style'
import { getPlates } from '../../../store/actionCreater/homeAction'

export default () => {
  const dispatch = useDispatch()
  const pagesize = 10
  const [pageNum, setPageNum] = useState(1)

  useEffect(() => {
    dispatch(getPlates())
    dispatch(getMomentsAction(pageNum, pagesize))
  }, [])
  return (
    <LeftWrapper>
      <HeadMenu />
      <Moments />
    </LeftWrapper>
  )
}
