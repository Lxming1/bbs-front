import { useState, useRef } from 'react'
import { throttle } from 'lodash'

import { emailCode, registerApi } from '../service/user'
import { verifyEmail, xmMesage } from '../utils/common'

const Register = () => {
  const [email, setEmail] = useState('1215743289@qq.com')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const codeRef = useRef(null)
  const getCode = throttle(async () => {
    const res = await emailCode({ email })
    if (res.code === 0) {
      xmMesage(res.code, res.message)
    }
  }, 2000)
  const register = async () => {
    if (verifyEmail(email)) {
      const res = await registerApi({ email, password, code })
      if (res.code === 0) {
        xmMesage(res.code, res.message)
      }
    } else {
      xmMesage(2, '邮箱格式有误')
    }
  }
  const inputClassName = 'input input-bordered input-md font-bold my-2 text-base'

  return (
    <div
      className="px-8 py-10 inline-block border border-1 border-gray-500 rounded-lg
       absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
      <div className="text-2xl text-center font-bold mb-4">账号注册</div>
      <div className="form-control">
        <input
          type="text"
          placeholder="邮箱账号"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="input-group flex items-center">
          <input type="text" placeholder="验证码" className={inputClassName} />
          <button className="btn btn-primary" onClick={getCode}>
            获取验证码
          </button>
        </label>
        <input
          type="password"
          placeholder="输入密码"
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary text-lg w-full mt-6 mb-4" onClick={register}>
        注 册
      </button>
    </div>
  )
}

export default Register
