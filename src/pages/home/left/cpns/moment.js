import { Empty } from 'antd'
import { useStoreInfo } from '../../../../hooks'
import MomentItem from './momentItem'
import { MomentWrapper } from './style'

const Moments = () => {
  const moments = useStoreInfo('moments')

  return (
    <MomentWrapper>
      {moments?.map((item) => {
        return <MomentItem moment={item} key={item.id} />
      }) ?? <Empty />}
    </MomentWrapper>
  )
}
export default Moments
