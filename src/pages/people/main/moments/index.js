import { memo, React } from 'react'

import MomentsWrapper from './style'

export default memo(() => {
  return (
    <MomentsWrapper>
      <div className="header">
        <div className="head-active">已发布</div>
        <div>审核中</div>
      </div>
    </MomentsWrapper>
  )
})
