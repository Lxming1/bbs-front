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

export const register = ({ name, email, password, code }) => {
  return request({
    url: '/users',
    method: 'post',
    data: {
      name,
      email,
      password,
      code,
    },
  })
}

export const care = (uid) => {
  return request({
    url: `/users/${uid}/care`,
    method: 'post',
  })
}

export const cancelCare = (uid) => {
  return request({
    url: `/users/${uid}/care`,
    method: 'delete',
  })
}

export const getFansList = (uid, pagenum, pagesize) => {
  return request({
    url: `/users/${uid}/fans`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const getCareList = (uid, pagenum, pagesize) => {
  return request({
    url: `/users/${uid}/care`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const editUserInfo = ({ address, name, birthday, gender, introduction }) => {
  return request({
    url: '/users/edit',
    method: 'post',
    data: {
      address,
      name,
      birthday,
      gender,
      introduction,
    },
  })
}

export const getAvatar = (userId) => {
  return request({
    url: `/user/${userId}/avatar`,
  })
}
