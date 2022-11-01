// import { combineReducers } from 'redux-immutable' //性能优化
// import userReducer from './reducer/userReducer'

// const reducer = combineReducers({
//   userInfo: userReducer,
// })

import { SET_MOMENTS, SET_USER } from './constant'
import { Map } from 'immutable'

const initialState = Map({
  user: {},
  moments: [],
})

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SET_USER:
      return state.set('user', actions.user)
    case SET_MOMENTS:
      return state.set('moments', actions.momentList)
    default:
      return state
  }
}
// const initialState = {
//   user: {},
// }

// function reducer(state = initialState, actions) {
//   switch (actions.type) {
//     case SET_USER:
//       return { ...state, user: actions.user }
//     default:
//       return state
//   }
// }

export default reducer
