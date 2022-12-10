import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setMomentTotal, setPlateId, setMomentsAction } from '@/store/actionCreater/homeAction'
import { HeadMenuWrapper } from './style'
import { useStoreInfo } from '@/hooks'

export default memo(() => {
  const { plateList } = useStoreInfo('plateList')
  const { plateId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [currentType, setCurrentType] = useState(0)

  const { type, value } = useParams()

  const items = [
    {
      label: '动态',
      type: 'moment',
    },
    {
      label: '用户',
      type: 'user',
    },
    {
      label: '我的',
      type: 'profile',
    },
  ]

  const changePlate = (type) => {
    setCurrentType(type)
    navigate(`/search/${type}/${value}`)
  }

  const classControl = (t) => (t === currentType ? 'active' : null)

  useEffect(() => {
    setCurrentType(type)
  }, [type])

  return (
    <HeadMenuWrapper>
      <ul>
        {items.map((item) => (
          <li
            key={item.type}
            className={classControl(item.type)}
            onClick={() => changePlate(item.type)}>
            {item.label}
          </li>
        ))}
      </ul>
    </HeadMenuWrapper>
  )
})
