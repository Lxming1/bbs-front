import { memo } from 'react'
import Wrapper from './style'

export default memo(({ hidden }) => {
  return <Wrapper onClick={() => hidden()} />
})
