import request from './'

export const createCollect = (name, status) => {
  return request({
    url: '/collect',
    method: 'post',
    data: {
      name,
      status,
    },
  })
}

export const getCollectByUid = (uid, momentId) => {
  return request({
    url: '/collect',
    params: {
      uid,
      momentId,
    },
  })
}

export const editCollect = (collectId, name, status) => {
  return request({
    url: `/collect/${collectId}`,
    method: 'patch',
    data: {
      name,
      status,
    },
  })
}

export const addToCollect = (collectId, momentId) => {
  return request({
    url: `/collect/${collectId}`,
    method: 'post',
    data: {
      momentId,
    },
  })
}

export const cancelCollect = (collectId, momentId) => {
  return request({
    url: `/collect/${collectId}`,
    method: 'delete',
    data: {
      momentId,
    },
  })
}

export const getCollectDetail = (collectId, pagenum, pagesize) => {
  return request({
    url: `/collect/detail/${collectId}`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const delCollect = (collectId) => {
  return request({
    url: `/collect/del/${collectId}`,
    method: 'delete',
  })
}
