import { getMoments } from '@/service/moment'
import { getPlateList } from '@/service/plate'
import { getCollectByUid } from '@/service/collect'
import {
  SET_COLLECT_LIST,
  SET_MOMENTS,
  SET_MOMENT_TOTAL,
  SET_PLATE_ID,
  SET_PLATE_LIST,
} from '../constant'

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

export const setCollectList = (collects) => ({
  type: SET_COLLECT_LIST,
  collects,
})

export const getMomentsAction = (pagenum, pagesize) => {
  return async (dispatch, getState) => {
    const state = getState()
    const moments = state.get('moments')
    const total = state.get('momentTotal')
    const plateId = state.get('plateId')

    if (total !== 0 && total === moments.length) return
    const {
      data: { moments: newMoments, total: momentTotal },
    } = await getMoments(pagenum, pagesize, plateId)

    dispatch(setMomentsAction([...moments, ...newMoments]))
    dispatch(setMomentTotal(momentTotal))
  }
}

export const getPlates = () => {
  return async (dispatch) => {
    const result = await getPlateList()
    dispatch(setPlatesAction(result.data))
  }
}

export const getCollects = (momentId) => {
  return async (dispatch, getState) => {
    const state = getState()
    const { id } = state.get('user')
    const result = await getCollectByUid(id, momentId)
    dispatch(setCollectList(result.data))
  }
}
