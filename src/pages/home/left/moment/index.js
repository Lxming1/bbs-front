import { Empty } from 'antd'
import MomentItem from './momentItem'
import { MomentWrapper } from './style'
import { memo } from 'react'

const Moments = memo(({ moments, setCurrentMoments }) => {
  return (
    <MomentWrapper>
      {moments?.length ? (
        moments?.map((item) => (
          <MomentItem moment={item} key={item.id} setCurrentMoments={setCurrentMoments} />
        ))
      ) : (
        <div className="emptyPage">
          <Empty />
        </div>
      )}
    </MomentWrapper>
  )
})
export default Moments
