import { useSelector } from 'react-redux'
import MomentItem from './momentsItem'
import { MomentWrapper } from './style'
const Moments = () => {
  const { moments } = useSelector((state) => ({
    moments: state.get('moments'),
  }))
  // const totle = moments.total
  const momentList = moments.moments
  return (
    <MomentWrapper>
      {momentList?.map((item) => {
        return <MomentItem moment={item} key={item.id} />
      })}
    </MomentWrapper>
  )
}
export default Moments
