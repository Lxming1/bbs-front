import { Empty } from 'antd'
import { useStoreInfo } from '@/hooks'
import MomentItem from './momentItem'
import { MomentWrapper } from './style'
import { memo, useCallback, useEffect, useState } from 'react'
import { getPriaseList } from '@/service/moment'

const Moments = memo(() => {
  const { moments, user } = useStoreInfo('moments', 'user')

  let [praiseList, setPraiseList] = useState([])
  setPraiseList = useCallback(setPraiseList, [])
  const getPraise = async () => {
    if (user?.id) {
      const { data: priaseList } = await getPriaseList()
      setPraiseList(priaseList)
    }
  }

  useEffect(() => {
    getPraise()
  }, [user])

  return (
    <MomentWrapper>
      {moments?.length ? (
        moments?.map((item) => {
          const isPraise = praiseList.includes(item.id)
          return (
            <MomentItem
              moment={item}
              key={item.id}
              setPraiseList={setPraiseList}
              isPraise={isPraise}
            />
          )
        })
      ) : (
        <div className="emptyPage">
          <Empty />
        </div>
      )}
    </MomentWrapper>
  )
})
export default Moments
