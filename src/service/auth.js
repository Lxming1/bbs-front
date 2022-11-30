import request from './index'

export const login = ({ email, password }) => {
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

export const register = ({ email, password, code }) => {
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

export const forgetGetCode = ({ email }) => {
  return request({
    url: '/users/sendemail-find',
    method: 'post',
    data: {
      email,
    },
  })
}

export const forgetSumbit = ({ email, password, code }) => {
  return request({
    url: '/users',
    method: 'patch',
    data: {
      email,
      password,
      code,
    },
  })
}
