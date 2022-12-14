import { useState, useRef, useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'
import RegisterWrapper from './style'
import { emailCode } from '@/service/auth'
import { verifyEmail, verifyPass, xmMessage } from '@/utils'
import { Button, Form, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { forgetGetCode, forgetSumbit } from '../../../service/auth'

const Register = memo(() => {
  const emailRules = '4-16个字符（字母、数字、下划线），下划线不能在首尾'
  const codeRules = '请输入验证码'
  const passRules = '6-16位字符（字母、数字、特殊符号），区分大小写'

  const navigator = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const [code, setCode] = useState('')

  const [registerSending, setRegisterSending] = useState(false)

  const [codeBtnContent, setCodeBtnContent] = useState('获取验证码')
  const [btnDisable, setBtnDisable] = useState(false)

  const [emailTip, setEmailTip] = useState(null)
  const [codeTip, setCodeTip] = useState(null)
  const [passTip, setPassTip] = useState(null)
  const [passAgainTip, setPassAgainTip] = useState(null)

  const emailRef = useRef(null)
  const codeRef = useRef(null)
  const passRef = useRef(null)
  const passAgainRef = useRef(null)
  const btnRef = useRef(null)

  const inputFn = (stateFn, TipFn, e, tips, verifyFn) => {
    const value = e.target.value
    stateFn(value)
    if (!verifyFn) return TipFn(!value ? tips : null)
    TipFn(!verifyFn(value) ? tips : null)

    if (TipFn === setPassAgainTip) {
      TipFn(password !== value ? '两次密码不一致，请重新输入' : null)
    } else if (TipFn === setPassTip && passwordAgain) {
      TipFn(passwordAgain !== value ? '两次密码不一致，请重新输入' : null)
    }
  }

  // 获取验证码
  const getCode = throttle(async () => {
    if (!email) return isNotInput(setEmailTip, '请输入邮箱账号！', emailRef)
    setCodeBtnContent(<LoadingOutlined />)
    setBtnDisable(true)
    const res = await forgetGetCode({ email })
    if (res.code === 0) {
      codeRef.current.focus()
      xmMessage(res.code, res.message)
      let i = 60
      setCodeBtnContent(`${i--}秒后重新获取`)
      const timer = setInterval(() => {
        setCodeBtnContent(`${i--}秒后重新获取`)
      }, 1000)
      setTimeout(() => {
        clearInterval(timer)
        setCodeBtnContent('获取验证码')
        setBtnDisable(false)
      }, i * 1000)
    } else {
      setCodeBtnContent('获取验证码')
      setBtnDisable(false)
    }
  }, 2000)

  const isNotInput = (setTipFn, tips, ref) => {
    setTipFn(tips)
    ref.current.focus()
  }

  const register = throttle(async () => {
    if (!email) return isNotInput(setEmailTip, '请输入邮箱账号！', emailRef)
    if (!code) return isNotInput(setCodeTip, '请输入验证码！', codeRef)
    if (!password) return isNotInput(setPassTip, '请输入密码！', passRef)
    if (!passwordAgain) return isNotInput(setPassAgainTip, '请确认密码！', passAgainRef)
    if (emailTip || codeTip || passTip || passAgainTip) return
    if (passTip !== passAgainTip)
      return isNotInput(setPassAgainTip, '两次密码不一致，请重新输入', passAgainRef)
    setRegisterSending(true)
    try {
      if (verifyEmail(email)) {
        if (password === passwordAgain) {
          const res = await forgetSumbit({ email, password, code })
          if (res.code === 0) {
            xmMessage(res.code, res.message)
            navigator('/login')
          }
        } else {
          xmMessage(2, '两次密码不一致，请重新输入')
        }
      }
    } catch (e) {
      setRegisterSending(false)
    }
  })

  useEffect(() => {
    if (password === passwordAgain) {
      setPassTip(null)
      setPassAgainTip(null)
    }
  }, [password, passwordAgain])

  useEffect(() => {
    const enterFn = (e) => {
      if (e.key === 'Enter') btnRef.current.click()
    }
    window.addEventListener('keydown', throttle(enterFn, 1000))
    return () => window.removeEventListener('keydown', throttle(enterFn, 1000))
  }, [])

  return (
    <RegisterWrapper>
      <h2>找回密码</h2>
      <Form>
        <Form.Item label="邮箱" help={emailTip} validateStatus={emailTip !== null && 'error'}>
          <Input
            ref={emailRef}
            type="text"
            name="邮箱账号"
            placeholder="邮箱账号"
            value={email}
            onChange={(e) => inputFn(setEmail, setEmailTip, e, emailRules, verifyEmail)}
          />
        </Form.Item>

        <Form.Item label="验证码" help={codeTip} validateStatus={codeTip !== null && 'error'}>
          <Input.Group compact>
            <Input
              className="verifyCode"
              type="text"
              name="验证码"
              placeholder="验证码"
              value={code}
              ref={codeRef}
              onChange={(e) => inputFn(setCode, setCodeTip, e, codeRules)}
            />
            <Button onClick={getCode} type="primary" className="codeBtn" disabled={btnDisable}>
              {codeBtnContent}
            </Button>
          </Input.Group>
        </Form.Item>
        <Form.Item label="新密码" help={passTip} validateStatus={passTip !== null && 'error'}>
          <Input.Password
            ref={passRef}
            name="新密码"
            placeholder="输入新密码"
            value={password}
            onChange={(e) => inputFn(setPassword, setPassTip, e, passRules, verifyPass)}
          />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          help={passAgainTip}
          validateStatus={passAgainTip !== null && 'error'}>
          <Input.Password
            ref={passAgainRef}
            name="确认新密码"
            placeholder="确认新密码"
            value={passwordAgain}
            onChange={(e) => inputFn(setPasswordAgain, setPassAgainTip, e, passRules, verifyPass)}
          />
        </Form.Item>
      </Form>
      <Form.Item>
        <Button type="primary" onClick={register} ref={btnRef} style={{ width: '100%' }}>
          {registerSending ? <LoadingOutlined /> : '提 交'}
        </Button>
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <a href="#/login">已有账号</a>
      </div>
    </RegisterWrapper>
  )
})

export default Register
