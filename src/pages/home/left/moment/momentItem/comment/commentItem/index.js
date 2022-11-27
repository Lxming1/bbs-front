import Search from 'antd/lib/transfer/search'
import { memo } from 'react'
import { useStoreInfo } from '@/hooks'
import CommentItemWrapper from './style'

export default memo(() => {
  const { user } = useStoreInfo('user')
  const onSearch = () => {}
  return (
    <CommentItemWrapper>
      <div className="header">
        <img src={user.avatar_url} alt="" className="avatar" />
        <Search
          className="commentInput"
          placeholder="评论千万条，友善第一条"
          allowClear
          enterButton="发布"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </CommentItemWrapper>
  )
})
