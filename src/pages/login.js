import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'

import { loginAction } from '../store/actionCreater/userActions'
import { verifyForm } from '../utils/common'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('1215743289@qq.com')
  const [password, setPassword] = useState('123456')
  const [tokenState, setTokenState] = useState(false)

  const emailRef = useRef(null)
  const passRef = useRef(null)

  const navigate = useNavigate()

  const login = throttle(async () => {
    if (!verifyForm([emailRef, passRef])) return
    const path = await dispatch(loginAction({ email, password, tokenState }))
    navigate(path)
  }, 1000)

  const inputClassName = 'input input-bordered input-sm w-80 font-bold my-2'

  return (
    <div
      className="px-8 py-10 inline-block border border-1 border-gray-500 rounded-lg
       absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
      <div className="text-xl text-center font-bold mb-4">账号登录</div>
      <div className="form-control">
        <input
          type="text"
          name="邮箱账号"
          ref={emailRef}
          placeholder="邮箱账号"
          className={inputClassName}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="密码"
          ref={passRef}
          placeholder="输入密码"
          className={inputClassName}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="label cursor-pointer text-xs justify-start">
          <input
            type="checkbox"
            checked={tokenState}
            className="checkbox-xs mr-2"
            onChange={() => {
              setTokenState(!tokenState)
            }}
          />
          <span className="label-text text-xs">30天内自动登录</span>
        </label>
      </div>
      <button className="btn btn-primary btn-sm w-full mt-6 mb-4" onClick={login}>
        登 录
      </button>
      <div className="text-xs text-center">
        <a href="" className="link link-hover">
          忘记密码
        </a>
        <i className="mx-2">|</i>
        <a href="/register" className="link link-hover">
          注册新账号
        </a>
      </div>
    </div>
  )
}

export default Login
