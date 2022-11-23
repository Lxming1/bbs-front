import { getMoments } from '../../service/moment'
import { getPlateList } from '../../service/plate'
import { SET_MOMENTS, SET_PLATE_LIST } from '../constant'

export const setMomentsAction = (momentList) => ({
  type: SET_MOMENTS,
  momentList,
})

export const setPlatesAction = (plateList) => ({
  type: SET_PLATE_LIST,
  plateList,
})

export const getMomentsAction = (pagenum, pagesize) => {
  return async (dispatch) => {
    const result = await getMoments(pagenum, pagesize)
    dispatch(setMomentsAction(result.data))
  }
}

export const getPlates = () => {
  return async (dispatch) => {
    const result = await getPlateList()
    console.log(result)
    dispatch(setPlatesAction(result.data))
  }
}
