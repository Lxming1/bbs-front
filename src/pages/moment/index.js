import { React, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlateList } from '../../service/palte'
import { getMomentsAction } from '../../store/actionCreater/momentAction'
import Moments from './cpns/moments'
import Right from './cpns/right'
import MomentWrapper from './style'

export default () => {
  const dispatch = useDispatch()
  const pagesize = 10
  const [pageNum, setPageNum] = useState(1)
  const [plateList, setPlateList] = useState([])

  const getPlate = async () => {
    const res = await getPlateList()
    setPlateList(res.data)
  }

  useEffect(() => {
    getPlate()
    dispatch(getMomentsAction(pageNum, pagesize))
  }, [])

  return (
    <MomentWrapper className="wrap-v2">
      <nav className="nav">
        <ul>
          {plateList?.map((item) => {
            return (
              <li key={item.id}>
                <a href="#">{item.name}</a>
              </li>
            )
          })}
        </ul>
      </nav>
      <div>
        <Moments />
        <Right />
      </div>
    </MomentWrapper>
  )
}
