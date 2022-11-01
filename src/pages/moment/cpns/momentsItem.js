const MomentItem = ({ moment }) => {
  return (
    <div>
      <h2>{moment.title}</h2>
      <div>
        <div></div>
        <div>{moment.author.name}</div>
      </div>
      <div>{moment.content}</div>
      <div></div>
    </div>
  )
}
export default MomentItem
