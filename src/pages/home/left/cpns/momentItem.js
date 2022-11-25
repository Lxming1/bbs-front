import dayjs from 'dayjs'
import { MomentItemWrapper } from './style'

const MomentItem = ({ moment }) => {
  return (
    <MomentItemWrapper>
      <div className="title">{moment.title}</div>
      <div>
        <div></div>
        <div className="name">{moment.author.name}</div>
      </div>
      <div className="praise">{moment.praiseCount}人赞同了该回答</div>
      <div className="content">{moment.content}</div>
      <div className="createTime">发布于 {dayjs(moment.createTime).format('YYYY-MM-DD hh:ss')}</div>
    </MomentItemWrapper>
  )
}
export default MomentItem
