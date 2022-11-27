import axios from 'axios'
import { xmMesage } from '../utils'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
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
      // if (err.response.status === 401) {
      // }
      xmMesage(res.code, res.message)
    }
    return err
  }
)

export default instance
