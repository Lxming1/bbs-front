import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'
import RegisterWrapper from './style'
import { emailCode } from '../../service/user'
import { verifyEmail, verifyPass, xmMesage } from '../../utils/common'
import { registerAction } from '../../store/actionCreater/userActions'
import { Button, Form, Input } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

const Register = () => {
  const inputClassName = 'input input-bordered input-sm font-bold my-2 text-sm '
  const errorTip = 'ml-1 text-red-500 '
  const codeBtnClassName = 'btn btn-primary btn-sm ml-2 '
  const btnClassName = 'btn btn-sm btn-primary w-full mt-6 mb-4 '

  // const nameRules = '4-16个字符（汉字、字母、数字、下划线）'
  const emailRules = '4-16个字符（字母、数字、下划线），下划线不能在首尾'
  const codeRules = '请输入验证码'
  const passRules = '6-16位字符（字母、数字、特殊符号），区分大小写'

  const navigator = useNavigate()

  // const [name, setName] = useState('')
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
    const res = await emailCode({ email })
    if (res.code === 0) {
      codeRef.current.focus()
      xmMesage(res.code, res.message)
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

  // 注册
  const register = throttle(async () => {
    if (!email) return isNotInput(setEmailTip, '请输入邮箱账号！', emailRef)
    if (!code) return isNotInput(setCodeTip, '请输入验证码！', codeRef)
    if (!password) return isNotInput(setPassTip, '请输入密码！', passRef)
    if (!passwordAgain) return isNotInput(setPasswordAgain, '请确认密码！', passAgainRef)
    if (emailTip || codeTip || passTip || passAgainTip) return
    if (passTip !== passAgainTip)
      return isNotInput(setPassAgainTip, '两次密码不一致，请重新输入', passAgainRef)
    setRegisterSending(true)
    try {
      const path = await registerAction({ email, password, passwordAgain, code })
      navigator(path)
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
      <h2>账号注册</h2>
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
        <Form.Item label="密码" help={passTip} validateStatus={passTip !== null && 'error'}>
          <Input.Password
            ref={passRef}
            name="密码"
            placeholder="输入密码"
            value={password}
            onChange={(e) => inputFn(setPassword, setPassTip, e, passRules, verifyPass)}
          />
        </Form.Item>
        <Form.Item
          label="确认密码"
          help={passAgainTip}
          validateStatus={passAgainTip !== null && 'error'}>
          <Input.Password
            ref={passAgainRef}
            name="确认密码"
            placeholder="确认密码"
            value={passwordAgain}
            onChange={(e) => inputFn(setPasswordAgain, setPassAgainTip, e, passRules, verifyPass)}
          />
        </Form.Item>
      </Form>
      <Form.Item>
        <Button type="primary" onClick={register} ref={btnRef} style={{ width: '100%' }}>
          {registerSending ? <LoadingOutlined /> : '注 册'}
        </Button>
      </Form.Item>
      <div style={{ textAlign: 'center' }}>
        <a href="/login">已有账号</a>
      </div>
    </RegisterWrapper>
  )
}

export default Register
