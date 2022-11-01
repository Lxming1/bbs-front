import request from './'

export const getPlateList = () => {
  return request({
    url: '/plate',
    method: 'GET',
  })
}
