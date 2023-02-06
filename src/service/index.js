import axios from 'axios'
import { xmMessage } from '../utils'
import store from '@/store'
import { setIsLogin, setUserMes } from '../store/actionCreater/authActions'

const instance = axios.create({
  baseURL: '/api',
  timeout: 20000,
})

instance.interceptors.request.use((config) => {
  let userInfo = sessionStorage.getItem('bbs-user') || localStorage.getItem('bbs-user')
  if (userInfo !== null) {
    userInfo = JSON.parse(userInfo)
    if (userInfo !== null) {
      config.headers.authorization = `Bearer ${userInfo.token}`
    }
  }
  return config
})

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && err.response.data) {
      const res = err.response.data
      if (err.response.status === 404) return err
      if (err.response.status === 403) {
        const { dispatch } = store
        sessionStorage.removeItem('bbs-user')
        localStorage.removeItem('bbs-user')
        dispatch(setIsLogin(false))
        dispatch(setUserMes(null))
        window.location.href = '#/login'
      }
      xmMessage(res.code, res.message)
    }
  }
)

export default instance
