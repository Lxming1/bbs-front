import { toast } from 'react-toastify'

// 验证邮箱有效性
export const verifyEmail = (email) => {
  const regEmail =
    /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ //验证邮箱正则

  if (!regEmail.test(email)) {
    xmMesage(2, '邮箱格式有误')
    return false
  }
  return true
}

export const xmMesage = (code, mes, time = 2) => {
  const style = {
    fontSize: '14px',
    color: 'black',
  }
  const html = <span style={style}>{mes}</span>
  if (code === 0) {
    toast.success(html, time)
  } else if (code === 1) {
    toast.error(html, time)
  } else {
    toast.warning(html, time)
  }
}
