import { memo, React, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import HeadMenu from './menus'
import LeftWrapper from './style'
import { getPlates } from '@/store/actionCreater/homeAction'
import { Outlet } from 'react-router-dom'

export default memo(() => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPlates())
  }, [])

  return (
    <LeftWrapper>
      <HeadMenu />
      <Outlet />
    </LeftWrapper>
  )
})
