import { memo } from 'react'
import { useStoreInfo } from '@/hooks'
import CommentWrapper from './style'
import { Input } from 'antd'

export default memo(() => {
  const { user } = useStoreInfo('user')
  return (
    <CommentWrapper>
      <div className="header">
        <img src={user.avatar_url} alt="" className="avatar" />
        <div className="inputGroup">
          <Input placeholder="评论千万条，友善第一条" size="large" />
          <div className="submitBtn">发布</div>
        </div>
      </div>
    </CommentWrapper>
  )
})
