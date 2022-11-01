import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'

import { loginAction } from '../store/actionCreater/userActions'
import { verifyEmail, verifyForm } from '../utils/common'

const Login = () => {
  const inputClassName = 'input input-bordered input-sm w-80 font-bold my-2 '
  const errorTip = 'ml-1 text-red-500 '
  const btnClassName = 'btn btn-sm btn-primary w-full my-4 '
  const emailRules = '4-16个字符（字母、数字、下划线），下划线不能在首尾'

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('1215743289@qq.com')
  const [password, setPassword] = useState('123123')
  const [tokenState, setTokenState] = useState(true)
  const [emailTip, setEmailTip] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const emailRef = useRef(null)
  const passRef = useRef(null)
  const btnRef = useRef(null)

  const inputFn = (stateFn, TipFn, e, verifyFn) => {
    stateFn(e.target.value)
    TipFn(!verifyFn(e.target.value))
  }

  const login = throttle(async () => {
    if (!verifyForm([emailRef, passRef])) return
    if (emailTip) return
    setIsSending(true)
    try {
      const path = await dispatch(loginAction({ email, password, tokenState }))
      navigate(path)
    } catch (e) {
      setIsSending(false)
    }
  }, 1000)

  const inputClassFn = (tip) => `${inputClassName}${tip ? 'input-error' : ''}`
  const tipClassFn = (tip) => `${errorTip}${!tip ? 'hidden' : ''}`

  useEffect(() => {
    const enterFn = async (e) => {
      if (e.key === 'Enter') await btnRef.current.click()
    }
    window.addEventListener('keydown', throttle(enterFn, 1000))
    return () => window.removeEventListener('keydown', throttle(enterFn, 1000))
  }, [])

  return (
    <div
      className="px-8 py-10 inline-block border border-1 border-gray-200 rounded-lg
       absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
      <div className="text-xl text-center font-bold mb-4">账号登录</div>
      <div className="form-control">
        <input
          type="text"
          name="邮箱账号"
          ref={emailRef}
          placeholder="邮箱账号"
          className={inputClassFn(emailTip)}
          value={email}
          onChange={(e) => inputFn(setEmail, setEmailTip, e, verifyEmail)}
        />
        <span className={tipClassFn(emailTip)}>{emailRules}</span>
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
      <button
        className={`${btnClassName}${isSending ? 'loading' : ''}`}
        onClick={login}
        ref={btnRef}>
        {isSending ? '' : '登 录'}
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
