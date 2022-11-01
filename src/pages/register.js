import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { throttle } from 'lodash'

import { emailCode } from '../service/user'
import { verifyEmail, verifyForm, verifyName, verifyPass, xmMesage } from '../utils/common'
import { registerAction } from '../store/actionCreater/userActions'

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

  const [codeBtnClassState, setCodeBtnClassState] = useState(codeBtnClassName)
  const [codeBtnContent, setCodeBtnContent] = useState('获取验证码')

  const [emailTip, setEmailTip] = useState(false)
  const [codeTip, setCodeTip] = useState(false)
  const [passTip, setPassTip] = useState(false)
  const [passAgainTip, setPassAgainTip] = useState(false)

  // const nameRef = useRef(null)
  const emailRef = useRef(null)
  const codeRef = useRef(null)
  const passRef = useRef(null)
  const passAgainRef = useRef(null)
  const btnRef = useRef(null)

  const inputFn = (stateFn, TipFn, e, verifyFn) => {
    stateFn(e.target.value)
    TipFn(verifyFn ? !verifyFn(e.target.value) : !e.target.value.trim())
  }

  const inputClassFn = (tip) => `${inputClassName}${tip ? 'input-error' : ''}`
  const tipClassFn = (tip) => `${errorTip}${!tip ? 'hidden' : ''}`

  // 获取验证码
  const getCode = throttle(async () => {
    if (email) {
      setCodeBtnClassState(`${codeBtnClassName}loading btn-disabled`)
      setCodeBtnContent('正在获取')
      const res = await emailCode({ email })
      if (res.code === 0) {
        setCodeBtnClassState(`${codeBtnClassName}btn-disabled`)
        codeRef.current.focus()
        xmMesage(res.code, res.message)
        let i = 60
        setCodeBtnContent(`${i--}秒后重新获取`)
        const timer = setInterval(() => {
          setCodeBtnContent(`${i--}秒后重新获取`)
        }, 1000)
        setTimeout(() => {
          clearInterval(timer)
          setCodeBtnClassState(codeBtnClassName)
          setCodeBtnContent('获取验证码')
        }, i * 1000)
      } else {
        setCodeBtnContent('获取验证码')
        setCodeBtnClassState(`${codeBtnClassName}`)
      }
    } else {
      emailRef.current.focus()
      xmMesage(2, '请输入邮箱账号')
    }
  }, 2000)

  // 注册
  const register = throttle(async () => {
    const refArr = [emailRef, codeRef, passRef, passAgainRef]
    if (!verifyForm(refArr)) return
    if (emailTip || codeTip || passTip || passAgainTip) return
    setRegisterSending(true)
    try {
      const path = await registerAction({ email, password, passwordAgain, code })
      navigator(path)
    } catch (e) {
      setRegisterSending(false)
    }
  })

  useEffect(() => {
    const enterFn = (e) => {
      if (e.key === 'Enter') btnRef.current.click()
    }
    window.addEventListener('keydown', throttle(enterFn, 1000))
    return () => window.removeEventListener('keydown', throttle(enterFn, 1000))
  }, [])

  return (
    <div
      className="px-8 py-10 inline-block border border-1 border-gray-200 rounded-lg
        absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4">
      <div className="text-xl text-center font-bold mb-4">账号注册</div>
      <div className="form-control">
        {/* <input
          type="text"
          name="昵称"
          placeholder="昵称"
          ref={nameRef}
          className={inputClassFn(nameTip)}
          value={name}
          onChange={(e) => inputFn(setName, setNameTip, e, verifyName)}
        />
        <span className={tipClassFn(nameTip)}>{nameRules}</span> */}
        <input
          type="text"
          name="邮箱账号"
          placeholder="邮箱账号"
          ref={emailRef}
          className={inputClassFn(emailTip)}
          value={email}
          onChange={(e) => inputFn(setEmail, setEmailTip, e, verifyEmail)}
        />
        <span className={tipClassFn(emailTip)}>{emailRules}</span>

        <label className="flex items-center">
          <input
            type="text"
            name="验证码"
            placeholder="验证码"
            className={inputClassFn(codeTip)}
            ref={codeRef}
            value={code}
            onChange={(e) => inputFn(setCode, setCodeTip, e)}
          />
          <button className={codeBtnClassState} onClick={getCode}>
            {codeBtnContent}
          </button>
        </label>
        <span className={tipClassFn(codeTip)}>{codeRules}</span>
        <input
          type="password"
          name="密码"
          placeholder="输入密码"
          ref={passRef}
          className={inputClassFn(passTip)}
          value={password}
          onChange={(e) => inputFn(setPassword, setPassTip, e, verifyPass)}
        />
        <span className={tipClassFn(passTip)}>{passRules}</span>
        <input
          type="password"
          name="确认密码"
          placeholder="确认密码"
          ref={passAgainRef}
          className={inputClassFn(passAgainTip)}
          value={passwordAgain}
          onChange={(e) => inputFn(setPasswordAgain, setPassAgainTip, e, verifyPass)}
        />
        <span className={tipClassFn(passAgainTip)}>{passRules}</span>
      </div>
      <button
        className={`${btnClassName}${registerSending ? 'loading' : ''}`}
        onClick={register}
        ref={btnRef}>
        注 册
      </button>
      <a href="/login" className="link link-hover block text-center">
        已有账号
      </a>
    </div>
  )
}

export default Register
