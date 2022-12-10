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
    url: `/comment/${commentId}/reply`,
    method: 'post',
    data: {
      content,
      momentId,
    },
  })
}

export const delelteComment = (commentId, momentId) => {
  return request({
    url: `/comment/${commentId}`,
    method: 'delete',
    data: {
      momentId,
    },
  })
}

export const getCommentList = (momentId) => {
  return request({
    url: '/comment',
    params: {
      momentId,
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
