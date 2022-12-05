import request from './'

export const getMoments = (pagenum, pagesize, plateId, uid) => {
  return request({
    url: `/moment/plate/${plateId}`,
    params: {
      pagenum,
      pagesize,
    },
    data: {
      uid,
    },
  })
}

export const getMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}`,
  })
}

export const sendMoment = ({ title, content, plateId, visible }) => {
  return request({
    url: '/moment',
    method: 'post',
    data: {
      title,
      content,
      plateId,
      visible,
    },
  })
}

export const delMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}`,
    method: 'delete',
  })
}

export const editMoment = (momentId, { title, content, plateId, visible }) => {
  return request({
    url: `/moment/${momentId}`,
    method: 'patch',
    data: {
      title,
      content,
      plateId,
      visible,
    },
  })
}

export const searchMoment = (content, pagenum, pagesize) => {
  return request({
    url: '/moment',
    params: {
      content,
      pagenum,
      pagesize,
    },
  })
}

export const praiseMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}/praise`,
    method: 'post',
  })
}

export const cancelPraiseMoment = (momentId) => {
  return request({
    url: `/moment/${momentId}/praise`,
    method: 'delete',
  })
}

export const getMomentPic = (filename, type) => {
  return request({
    url: `/moment/image/${filename}`,
    params: {
      type,
    },
  })
}

export const getPriaseList = () => {
  return request({
    url: `/moment/praise`,
  })
}

export const uploadPicture = (momentId, data) => {
  return request({
    url: `/upload/picture?momentId=${momentId}`,
    method: 'post',
    data,
  })
}

export const getMomentByUser = (uid, pagenum, pagesize) => {
  return request({
    url: `/users/${uid}/moments`,
    params: {
      pagenum,
      pagesize,
    },
  })
}
