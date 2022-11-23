import { useStoreInfo } from '../../../../hooks'
import MomentItem from './momentItem'
import { MomentWrapper } from './style'
const Moments = () => {
  const momentList = useStoreInfo('moments')
  console.log(momentList)
  return (
    <MomentWrapper>
      {momentList?.map((item) => {
        return <MomentItem moment={item} key={item.id} />
      })}
    </MomentWrapper>
  )
}
export default Moments
