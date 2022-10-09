import { loginApi, registerApi } from '../../service/user'
import { verifyEmail, xmMesage } from '../../utils/common'
import { SET_USER } from '../constant'

export const setUserMes = (user) => ({
  type: SET_USER,
  user,
})

export const loginAction = ({ email, password, tokenState }) => {
  return async (dispatch) => {
    return new Promise(async (resolve, reject) => {
      if (verifyEmail(email)) {
        const res = await loginApi({ email, password })
        if (res.code === 0) {
          const jsonMes = JSON.stringify(res.data)
          tokenState
            ? localStorage.setItem('bbs-user', jsonMes)
            : sessionStorage.setItem('bbs-user', jsonMes)

          dispatch(setUserMes(res.data))
          resolve('/')
        }
      }
    })
  }
}

export const registerAction = ({ name, email, password, passwordAgain, code }) => {
  return new Promise(async (resolve, reject) => {
    if (verifyEmail(email)) {
      if (password === passwordAgain) {
        const res = await registerApi({ name, email, password, code })
        if (res.code === 0) {
          xmMesage(res.code, res.message)
          resolve('/login')
        }
      } else {
        xmMesage(2, '两次密码不一致，请重新输入')
      }
    }
  })
}
