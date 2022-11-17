import request from '.'

export const getPlateList = () => {
  return request({
    url: '/plate/list',
    method: 'GET',
  })
}

export const getMomentByPlate = (plateId, pagenum, pagesize) => {
  return request({
    url: `/plage/${plateId}`,
    params: {
      pagenum,
      pagesize,
    },
  })
}
