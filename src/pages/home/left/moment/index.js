import { Empty } from 'antd'
import MomentItem from './momentItem'
import { MomentWrapper } from './style'
import { memo } from 'react'

const Moments = memo(({ moments, setCurrentMoments, desc = '暂无动态', isEnd }) => {
  return (
    <MomentWrapper>
      {moments?.length ? (
        moments?.map((item) => (
          <MomentItem moment={item} key={item.id} setCurrentMoments={setCurrentMoments} />
        ))
      ) : (
        <div className="emptyPage">
          <Empty description={desc} />
        </div>
      )}
      {isEnd && moments.length !== 0 && (
        <div className="Box">
          <Empty description="没有更多动态啦" />
        </div>
      )}
    </MomentWrapper>
  )
})
export default Moments
