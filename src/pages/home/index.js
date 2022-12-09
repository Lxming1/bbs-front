import { memo, React, useEffect } from 'react'

import Right from './right'
import Left from './left'
import HomeWrapper from './style'

export default memo(() => {
  return (
    <HomeWrapper>
      <Left />
      <Right />
    </HomeWrapper>
  )
})
