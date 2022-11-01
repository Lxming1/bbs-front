import request from './'

export const getMomentsApi = (pagenum, pagesize) => {
  return request({
    url: '/moment',
    params: {
      pagenum,
      pagesize,
    },
  })
}
