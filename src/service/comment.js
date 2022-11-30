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

export const delelteComment = (commentId) => {
  return request({
    url: `/comment/${commentId}`,
    method: 'delete',
  })
}

export const getCommentList = (momentId, userId) => {
  return request({
    url: '/comment',
    params: {
      momentId,
      userId,
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
