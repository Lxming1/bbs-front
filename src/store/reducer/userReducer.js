import { SET_USER } from '../constant'

const initialState = {
  user: {},
  momentList: [],
}

function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SET_USER:
      return { ...state, user: actions.user }
    default:
      return state
  }
}

export default reducer
