import { login, register } from '../../service/user'
import { verifyEmail, xmMesage } from '../../utils'
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
        xmMesage(0, '登录成功')
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

export const registerAction = ({ name, email, password, passwordAgain, code }) => {
  return new Promise(async (resolve, reject) => {
    if (verifyEmail(email)) {
      if (password === passwordAgain) {
        const res = await register({ name, email, password, code })
        if (res.code === 0) {
          xmMesage(res.code, res.message)
          resolve('/login')
        } else {
          reject()
        }
      } else {
        xmMesage(2, '两次密码不一致，请重新输入')
      }
    }
  })
}
