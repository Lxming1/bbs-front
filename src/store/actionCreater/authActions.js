import { login } from '@/service/auth'
import { xmMessage } from '@/utils'
import { SET_IS_LOGIN, SET_USER } from '../constant'

export const setIsLogin = (isLogin) => ({
  type: SET_IS_LOGIN,
  isLogin,
})

export const setUserMes = (user) => ({
  type: SET_USER,
  user,
})

export const handleUserMes = (user) => {
  return (dispatch) => {
    let storeUser = JSON.parse(window.localStorage.getItem('bbs-user'))
    if (storeUser) {
      user.token = storeUser.token
      window.localStorage.setItem('bbs-user', JSON.stringify(user))
    } else {
      window.localStorage.setItem('bbs-user', JSON.stringify(user))
    }
    dispatch(setUserMes(user))
  }
}

export const loginAction = ({ email, password, tokenState }) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      // if (verifyEmail(email)) {
      try {
        const res = await login({ email, password })
        if (res.code === 0) {
          xmMessage(0, '登录成功')
          const jsonMes = JSON.stringify(res.data)
          tokenState
            ? localStorage.setItem('bbs-user', jsonMes)
            : sessionStorage.setItem('bbs-user', jsonMes)
          dispatch(setIsLogin(true))
          dispatch(setUserMes(res.data))
          resolve('/')
        }
      } catch (e) {
        reject()
      }
    })
  }
}
