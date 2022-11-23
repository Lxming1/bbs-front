import { SET_MOMENTS, SET_PLATE_LIST, SET_USER } from './constant'
import { Map } from 'immutable'

const initialState = Map({
  user: {},
  moments: [],
  plateList: [],
})

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SET_USER:
      return state.set('user', actions.user)
    case SET_MOMENTS:
      return state.set('moments', actions.momentList)
    case SET_PLATE_LIST:
      return state.set('plateList', actions.plateList)
    default:
      return state
  }
}

export default reducer
