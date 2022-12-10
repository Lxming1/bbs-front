import { memo, React, useEffect } from 'react'

import Right from './right'
import Left from './left'
import HomeWrapper from './style'
import { Outlet, useParams } from 'react-router-dom'

export default memo(() => {
  return (
    <HomeWrapper>
      <Outlet />
      <Right />
    </HomeWrapper>
  )
})
