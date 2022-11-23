import { useDispatch } from 'react-redux'
import { useStoreInfo } from '../../../../hooks'
import { HeadMenuWrapper } from './style'

export default () => {
  const plateList = useStoreInfo('plateList')
  const dispatch = useDispatch()
  const getAll = () => {}

  return (
    <HeadMenuWrapper>
      <ul>
        <li onClick={getAll}>全部</li>
        {plateList?.map((item) => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
    </HeadMenuWrapper>
  )
}
