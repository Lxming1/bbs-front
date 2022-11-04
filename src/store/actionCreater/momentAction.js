import { getMomentsApi } from '../../service/moment'
import { SET_MOMENTS } from '../constant'

export const setMomentsAction = (momentList) => ({
  type: SET_MOMENTS,
  momentList,
})

export const getMomentsAction = (pagenum, pagesize) => {
  return async (dispatch) => {
    const result = await getMomentsApi(pagenum, pagesize)
    await dispatch(setMomentsAction(result.data))
  }
}