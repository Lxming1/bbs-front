import { message } from 'antd'

export const verifyEmail = (email) => {
  const regEmail =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return regEmail.test(email)
}

export const verifyName = (name) => {
  const regName = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,16}$/
  return regName.test(name)
}

export const verifyPass = (pass) => {
  const regPass = /^[0-9a-zA-Z_]{6,16}$/
  return regPass.test(pass)
}

export const xmMesage = (code, mes) => {
  if (code === 0) {
    message.success(mes)
  } else if (code === 1) {
    message.error(mes)
  } else {
    message.warning(mes)
  }
}

export const verifyForm = (refs) => {
  for (const item of refs) {
    const input = item.current
    if (input.value.trim() === '') {
      xmMesage(2, input.name + '不为空！')
      input.focus()
      return false
    }
  }
  return true
}

export function throttle(fn, delay, options = { firstExecute: true, keyUpExecute: false }) {
  let timer = null
  let flag = true
  const { firstExecute, keyUpExecute } = options

  return function (...args) {
    // 第一段时间先不执行
    if (!firstExecute && flag) {
      flag = false
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, delay)
    }
    if (timer === null) {
      fn.call(this, ...args)
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, delay)
    }
  }
}

export function debounce(fn, delay, immediate = false) {
  let timer = null
  // 控制当设置立即执行后，需要在每一次输入的开始执行一次
  let invoke = false

  function _debounce(...args) {
    if (timer) clearTimeout(timer)

    // 输入第一个字符先发一次请求
    if (immediate && !invoke) {
      fn.call(this, ...args)
      invoke = true
    } else {
      // 延迟执行
      timer = setTimeout(() => {
        fn.call(this, ...args)
        timer = null
        invoke = false
      }, delay)
    }
  }

  //取消事件
  _debounce.cancel = function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
      invoke = false
    }
  }

  return _debounce
}
