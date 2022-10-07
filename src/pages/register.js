import { useState } from 'react'
import { throttle } from 'lodash'

import { emailCode } from '../service/user'
import { xmMesage } from '../utils/common'
import { registerAction } from '../store/actionCreater/userActions'

const Register = () => {
  const [email, setEmail] = useState('1215743289@qq.com')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [code, setCode] = useState('')

  // 获取验证码
  const getCode = throttle(async () => {
    const res = await emailCode({ email })
    if (res.code === 0) {
      xmMesage(res.code, res.message)
    }
  }, 2000)

  // 注册
  const register = throttle(async () => {
    const path = await registerAction({ email, password, passwordAgain, code })
    navigator(path)
  })

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
          <input
            type="text"
            placeholder="验证码"
            className={inputClassName}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
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
        <input
          type="password"
          placeholder="再次输入密码"
          className={inputClassName}
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>
      <button className="btn btn-primary text-lg w-full mt-6 mb-4" onClick={register}>
        注 册
      </button>
      <a href="/login" className="link link-hover block text-center">
        已有账号
      </a>
    </div>
  )
}

export default Register
