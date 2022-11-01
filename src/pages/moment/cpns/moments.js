import { useSelector } from 'react-redux'
import MomentItem from './momentsItem'
const Moments = () => {
  const { moments } = useSelector((state) => ({
    moments: state.get('moments'),
  }))
  // const totle = moments.total
  const momentList = moments.moments
  return (
    <div>
      {momentList?.map((item) => {
        return <MomentItem moment={item} key={item.id} />
      })}
    </div>
  )
}
export default Moments
