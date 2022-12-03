import { login } from '@/service/auth'
import { xmMessage } from '@/utils'
import { SET_USER } from '../constant'

export const setUserMes = (user) => ({
  type: SET_USER,
  user,
})

export const loginAction = ({ email, password, tokenState }) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      // if (verifyEmail(email)) {
      const res = await login({ email, password })
      if (res.code === 0) {
        xmMessage(0, '登录成功')
        const jsonMes = JSON.stringify(res.data)
        tokenState
          ? localStorage.setItem('bbs-user', jsonMes)
          : sessionStorage.setItem('bbs-user', jsonMes)

        dispatch(setUserMes(res.data))
        resolve('/')
      } else {
        reject()
      }
      // }
    })
  }
}