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
  const [currentPlateId, setCurrentPlateId] = useState(0)

  const changePlate = (id) => {
    if (plateId === String(id)) return
    setCurrentPlateId(id)
    dispatch(setMomentsAction([]))
    dispatch(setMomentTotal(0))
    dispatch(setPlateId(id))
    navigate(id === 0 ? '/' : `/${id}`)
  }
  const classControl = (id) => (id === currentPlateId ? 'active' : null)

  useEffect(() => {
    let plate
    if (plateId !== 'care') {
      plate = isNaN(parseInt(plateId)) ? 0 : parseInt(plateId)
    } else {
      plate = plateId
    }
    dispatch(setMomentsAction([]))
    dispatch(setPlateId(plate))
    setCurrentPlateId(plate)
  }, [plateId])

  return (
    <HeadMenuWrapper>
      <ul>
        <li onClick={() => changePlate(0)} className={classControl(0)}>
          全部
        </li>
        <li onClick={() => changePlate('care')} className={classControl('care')}>
          关注
        </li>
        {plateList?.map((item) => (
          <li key={item.id} onClick={() => changePlate(item.id)} className={classControl(item.id)}>
            {item.name}
          </li>
        ))}
      </ul>
    </HeadMenuWrapper>
  )
})
