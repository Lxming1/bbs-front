import request from './index'

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

export const getUserDetail = (userId) => {
  return request({
    url: `/users/${userId}/detail`,
  })
}

export const getAddress = () => {
  return request({
    url: '/users/address',
  })
}
