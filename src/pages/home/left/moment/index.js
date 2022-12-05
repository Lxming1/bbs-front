import { Empty } from 'antd'
import { useStoreInfo } from '@/hooks'
import MomentItem from './momentItem'
import { MomentWrapper } from './style'
import { memo, useCallback, useEffect, useState } from 'react'
import { setMomentsAction } from '@/store/actionCreater/homeAction'
import { useDispatch } from 'react-redux'
import { useLazyLoad } from '@/hooks'

const Moments = memo(() => {
  const { moments } = useStoreInfo('moments')
  const dispatch = useDispatch()

  let [currentMoments, setCurrentMoments] = useState(moments)
  setCurrentMoments = useCallback(setCurrentMoments, [])

  useEffect(() => {
    setCurrentMoments(moments)
  }, [moments])

  useEffect(() => {
    dispatch(setMomentsAction(currentMoments))
  }, [currentMoments])

  useLazyLoad()

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
