import { message } from 'antd'
import dayjs from 'dayjs'

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

export const xmMessage = (code, mes) => {
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
      xmMessage(2, input.name + '不为空！')
      input.focus()
      return false
    }
  }
  return true
}

export function handleDate(time) {
  const nowYear = dayjs().format('YYYY')
  const split = time.split('T')
  if (time.substring(0, 4) !== nowYear) {
    return split[0]
  }
  const nowDay = dayjs().format('YYYY-MM-DD')
  if (split[0] === nowDay) {
    return split[1].substring(0, 5)
  }
  return split[0].substring(5, 10)
}

let debounceTimer = null
export function debounce(callback, duration, isFirstExecution) {
  return function (...args) {
    let ctx = this
    const delay = function () {
      debounceTimer = null
      if (!isFirstExecution) callback.apply(ctx, args)
    }
    let executeNow = isFirstExecution && !debounceTimer
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(delay, duration)
    if (executeNow) callback.apply(ctx, args)
  }
}

export const getAagByTime = (time) =>
  Math.ceil((new Date().getTime() - new Date(time).getTime()) / 31536000000)

export const verifyLogin = async (isLogin) => {
  return new Promise((resolve, reject) => {
    if (!isLogin) {
      xmMessage(2, '请先登录')
      window.location.href = '#/login'
      reject()
    }
    resolve()
  })
}
