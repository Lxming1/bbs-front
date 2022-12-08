import request from './'

// praise, collect, reply
export const getNoticeList = (type, pagenum, pagesize) => {
  return request({
    url: `/notices/${type}`,
    params: {
      pagenum,
      pagesize,
    },
  })
}

export const readNotices = (ids) => {
  return request({
    url: '/notices',
    method: 'patch',
    data: {
      ids,
    },
  })
}

export const delNotice = (noticesId) => {
  return request({
    url: `/notices/${noticesId}`,
    method: 'delete',
  })
}
