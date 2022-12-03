import { memo } from 'react'
import RightWrapper from './style'

const Right = memo(() => {
  return (
    <RightWrapper>
      <a href="#/moment/new" className="Button">
        发表动态
      </a>
    </RightWrapper>
  )
})

export default Right
