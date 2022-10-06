import { combineReducers } from 'redux-immutable' //性能优化
import userReducer from './reducer/userReducer'

const reducer = combineReducers({
  userInfo: userReducer,
})
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
