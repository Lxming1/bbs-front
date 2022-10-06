import axios from 'axios'
import { xmMesage } from '../utils/common'

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
})

instance.interceptors.request.use((config) => {
  return config
})

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && err.response.data) {
      const res = err.response.data
      xmMesage(res.code, res.message)
    }
    return err
  }
)

export default instance
