import request from './'

export const createComment = (content, momentId) => {
  return request({
    url: '/comment',
    method: 'post',
    data: {
      content,
      momentId,
    },
  })
}

export const replyComment = (commentId, content, momentId) => {
  return request({
    url: `/comment/${commentId}`,
    method: 'post',
    data: {
      content,
      momentId,
    },
  })
}

export const delComment = (commentId) => {
  return request({
    url: `/comment/${commentId}`,
    method: 'delete',
  })
}

export const getCommentList = (momentId, pagenum, pagesize) => {
  return request({
    url: '/comment',
    params: {
      momentId,
      pagenum,
      pagesize,
    },
  })
}

export const praiseComment = (commentId, momentId) => {
  return request({
    url: `/comment/${commentId}/praise`,
    method: 'post',
    data: {
      momentId,
    },
  })
}

export const cancelPraiseComment = (commentId, momentId) => {
  return request({
    url: `/comment/${commentId}/praise`,
    method: 'delete',
    data: {
      momentId,
    },
  })
}