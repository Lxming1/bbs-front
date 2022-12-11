import { getMoments, getMomentsByCare, searchMoment } from '@/service/moment'
import { getPlateList } from '@/service/plate'
import { SET_MOMENTS, SET_MOMENT_TOTAL, SET_PLATE_ID, SET_PLATE_LIST } from '../constant'
import { xmMessage } from '@/utils'

export const setMomentsAction = (momentList) => ({
  type: SET_MOMENTS,
  momentList,
})

export const setPlatesAction = (plateList) => ({
  type: SET_PLATE_LIST,
  plateList,
})

export const setMomentTotal = (total) => ({
  type: SET_MOMENT_TOTAL,
  total,
})

export const setPlateId = (plateId) => ({
  type: SET_PLATE_ID,
  plateId,
})

export const getMomentsAction = (pagenum, pagesize) => {
  return async (dispatch, getState) => {
    const state = getState()
    const moments = state.get('moments')
    const total = state.get('momentTotal')
    const plateId = state.get('plateId')
    const isLogin = state.get('isLogin')
    if (total !== 0 && total === moments.length) return
    let result
    if (plateId === 'care') {
      if (!isLogin) {
        window.location.href = '#/login'
        xmMessage(2, '请先登录')
        return
      }
      result = await getMomentsByCare(pagenum, pagesize)
    } else {
      result = await getMoments(pagenum, pagesize, plateId)
    }
    const { moments: newMoments, total: momentTotal } = result.data
    dispatch(setMomentsAction([...moments, ...newMoments]))
    dispatch(setMomentTotal(momentTotal))
    return newMoments
  }
}

export const getMomentBySearch = (pagenum, pagesize, value) => {
  return async (dispatch, getState) => {
    const state = getState()
    const moments = state.get('moments')
    const total = state.get('momentTotal')
    if (total !== 0 && total === moments.length) return
    let result = await searchMoment(value, pagenum, pagesize)
    const { moments: newMoments, total: momentTotal } = result.data
    dispatch(setMomentsAction([...moments, ...newMoments]))
    dispatch(setMomentTotal(momentTotal))
    return newMoments
  }
}

export const getPlates = () => {
  return async (dispatch) => {
    const result = await getPlateList()
    dispatch(setPlatesAction(result.data))
  }
}
