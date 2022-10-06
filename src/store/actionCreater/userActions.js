import { loginApi } from '../../service/user'
import { verifyEmail } from '../../utils/common'
import { SET_USER } from '../constant'

export const setUserMes = (user) => ({
  type: SET_USER,
  user,
})

export const loginAction = ({ email, password }) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      if (verifyEmail(email)) {
        const res = await loginApi({ email, password })
        if (res.code === 0) {
          localStorage.setItem('bbs-user', JSON.stringify(res.data))
          dispatch(setUserMes(res.data))
          resolve()
        }
      }
    })
  }
}
