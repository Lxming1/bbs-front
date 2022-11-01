import { toast } from 'react-toastify'

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
  const style = {
    fontSize: '14px',
    color: 'black',
  }
  const html = <span style={style}>{mes}</span>
  if (code === 0) {
    toast.success(html)
  } else if (code === 1) {
    toast.error(html)
  } else {
    toast.warning(html)
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
