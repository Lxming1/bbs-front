import { React, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlateList } from '../../service/palte'
import { getMomentsAction } from '../../store/actionCreater/momentAction'
import Moments from './cpns/moments'

export const Moment = () => {
  const dispatch = useDispatch()
  const pagesize = 10
  const [pageNum, setPageNum] = useState(1)
  const [plateList, setPlateList] = useState([])

  useEffect(() => {
    dispatch(getMomentsAction(pageNum, pagesize))
    getPlateList().then((res) => {
      console.log(res)
      setPlateList(res.data)
    })
  }, [])

  return (
    <div>
      <nav>
        <ul>
          {plateList?.map((item) => {
            return <li key={item.id}>{item.name}</li>
          })}
        </ul>
      </nav>
      <Moments />
    </div>
  )
}
