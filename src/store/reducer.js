import {
  SET_MOMENTS,
  SET_MOMENT_TOTAL,
  SET_PLATE_LIST,
  SET_USER,
  SET_PLATE_ID,
  SET_COLLECT_LIST,
} from './constant'
import { Map } from 'immutable'

const initialState = Map({
  user: {},
  momentTotal: 0,
  plateId: 0,
  moments: [],
  plateList: [],
  collects: [],
})

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SET_USER:
      return state.set('user', actions.user)
    case SET_MOMENTS:
      return state.set('moments', actions.momentList)
    case SET_PLATE_LIST:
      return state.set('plateList', actions.plateList)
    case SET_MOMENT_TOTAL:
      return state.set('momentTotal', actions.total)
    case SET_PLATE_ID:
      return state.set('plateId', actions.plateId)
    case SET_COLLECT_LIST:
      return state.set('collects', actions.collects)
    default:
      return state
  }
}

export default reducer
