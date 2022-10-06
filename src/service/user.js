import request from './index'

export const loginApi = ({ email, password }) => {
  return request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password,
    },
  })
}

export const emailCode = ({ email }) => {
  return request({
    url: '/users/sendemail',
    method: 'post',
    data: {
      email,
    },
  })
}

export const registerApi = ({ email, password, code }) => {
  return request({
    url: '/users',
    method: 'post',
    data: {
      email,
      password,
      code,
    },
  })
}
