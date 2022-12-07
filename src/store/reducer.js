import {
  SET_MOMENTS,
  SET_MOMENT_TOTAL,
  SET_PLATE_LIST,
  SET_USER,
  SET_PLATE_ID,
  SET_PROFILE_USER,
  SET_IS_PROFILE,
  SET_IS_LOGIN,
  SET_PEOPLE_INDEX,
} from './constant'
import { Map } from 'immutable'

const initialState = Map({
  user: null,
  momentTotal: 0,
  plateId: 0,
  moments: [],
  plateList: [],
  profileUser: null,
  isProfile: false,
  isLogin: false,
  peopleIndex: 0,
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
    case SET_PROFILE_USER:
      return state.set('profileUser', actions.profileUser)
    case SET_IS_PROFILE:
      return state.set('isProfile', actions.isProfile)
    case SET_IS_LOGIN:
      return state.set('isLogin', actions.isLogin)
    case SET_PEOPLE_INDEX:
      return state.set('peopleIndex', actions.peopleIndex)
    default:
      return state
  }
}

export default reducer
