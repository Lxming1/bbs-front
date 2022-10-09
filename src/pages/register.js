import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'

import { emailCode } from '../service/user'
import { verifyForm, xmMesage } from '../utils/common'
import { registerAction } from '../store/actionCreater/userActions'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [code, setCode] = useState('')

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const codeRef = useRef(null)
  const passRef = useRef(null)
  const passAgainRef = useRef(null)
  const refArr = [nameRef, emailRef, codeRef, passRef, passAgainRef]

  const navigator = useNavigate()

  // 获取验证码
  const getCode = throttle(async () => {
    if (email) {
      const res = await emailCode({ email })
      if (res.code === 0) {
        codeRef.current.focus()
        xmMesage(res.code, res.message)
      }
    } else {
      emailRef.current.focus()
      xmMesage(2, '请输入邮箱账号')
    }
  }, 2000)

  // 注册
  const register = throttle(async () => {
    if (!verifyForm(refArr)) return
    const path = await registerAction({ name, email, password, passwordAgain, code })
    navigator(path)
  })

  const inputClassName = 'input input-bordered input-sm font-bold my-2 text-sm'

  return (
    <div
      className="px-8 py-10 inline-block border border-1 border-gray-200 rounded-lg
       absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
      <div className="text-xl text-center font-bold mb-4">账号注册</div>
      <div className="form-control">
        <input
          type="text"
          name="昵称"
          placeholder="昵称"
          ref={nameRef}
          className={inputClassName}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="邮箱账号"
          placeholder="邮箱账号"
          ref={emailRef}
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="flex items-center">
          <input
            type="text"
            name="验证码"
            placeholder="验证码"
            className={inputClassName}
            ref={codeRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="btn btn-primary btn-sm ml-2" onClick={getCode}>
            获取验证码
          </button>
        </label>
        <input
          type="password"
          name="密码"
          placeholder="输入密码"
          ref={passRef}
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="确认密码"
          placeholder="确认密码"
          ref={passAgainRef}
          className={inputClassName}
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
      </div>
      <button className="btn btn-sm btn-primary w-full mt-6 mb-4" onClick={register}>
        注 册
      </button>
      <a href="/login" className="link link-hover block text-center">
        已有账号
      </a>
    </div>
  )
}

export default Register
