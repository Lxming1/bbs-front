import React, { memo, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'
import LoginWrapper from './style'
import { loginAction } from '@/store/actionCreater/authActions'
import { LoadingOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'

const Login = memo(() => {
  const emailRules = '4-16个字符（字母、数字、下划线），下划线不能在首尾'

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [tokenState, setTokenState] = useState(true)
  const [isSending, setIsSending] = useState(false)

  const [emailTip, setEmailTip] = useState(null)
  const [passwordTip, setPasswordTip] = useState(null)

  const emailRef = useRef(null)
  const passRef = useRef(null)
  const btnRef = useRef(null)

  const login = throttle(async () => {
    try {
      const { email, password } = await form.validateFields()
      if (!email) return isNotInput(setEmailTip, '请输入邮箱！', emailRef)
      if (!password) return isNotInput(setPasswordTip, '请输入密码！', passRef)
      if (passwordTip) return
      setIsSending(true)
      try {
        const path = await dispatch(loginAction({ email, password, tokenState }))
        if (path === 'err') {
          setIsSending(true)
          return
        }
        navigate(path)
      } catch (e) {
        throw new Error(e)
      }
    } catch (e) {
      setIsSending(false)
      console.log(e)
    }
  }, 1000)

  useEffect(() => {
    form.validateFields(['email'])
    form.validateFields(['password'])
  }, [email, form, password])

  const emailChange = (e) => {
    setEmail(e.target.value)
  }

  const passwordChange = (e) => {
    setPassword(e.target.value)
    setPasswordTip(null)
  }

  const isNotInput = (setTipFn, tips, ref) => {
    setTipFn(tips)
    ref.current.focus()
  }

  useEffect(() => {
    const enterFn = throttle(async (e) => {
      if (e.key === 'Enter') await btnRef.current.click()
    })
    window.addEventListener('keydown', enterFn)
    return () => window.removeEventListener('keydown', enterFn)
  }, [])

  return (
    <LoginWrapper>
      <h2>账号登录</h2>
      <Form form={form}>
        <Form.Item
          help={emailTip}
          validateStatus={emailTip !== null && 'error'}
          name="email"
          label="邮箱">
          <Input placeholder="邮箱账号" value={email} onChange={emailChange} ref={emailRef} />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          help={passwordTip}
          validateStatus={passwordTip !== null && 'error'}>
          <Input.Password
            type="password"
            placeholder="输入密码"
            value={password}
            onChange={passwordChange}
            ref={passRef}
          />
        </Form.Item>
        <Checkbox
          className="checkbox"
          checked={tokenState}
          onChange={() => {
            setTokenState(!tokenState)
          }}>
          30天内自动登录
        </Checkbox>
        <Form.Item>
          <Button type="primary" onClick={login} className="loginBtn" ref={btnRef}>
            {isSending ? <LoadingOutlined /> : '登 录'}
          </Button>
        </Form.Item>
      </Form>
      <div className="loginFooter">
        <a href="#/forget">忘记密码</a>
        <i style={{ margin: '0 5px' }}>|</i>
        <a href="#/register">注册新账号</a>
      </div>
    </LoginWrapper>
  )
})

export default Login
