import { LikeFilled } from '@ant-design/icons'
import { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPeopleIndex } from '../../../../store/actionCreater/peopleAction'
import PeopleRightWrapper from './style'

export default memo(({ peopleInfo }) => {
  const likeCount = peopleInfo?.commentLike + peopleInfo?.momentLike + peopleInfo?.collectCount
  const dispatch = useDispatch()

  const changePage = (type) => {
    dispatch(setPeopleIndex(2))
    window.location.href = `#/people/${peopleInfo?.id}/${type}`
  }

  return (
    <PeopleRightWrapper>
      <div className="topContent boxShadow">
        <div className="title">个人成就</div>
        <div className="achievement">
          <div className="detail">
            <div className="detailLeft">
              <LikeFilled />
            </div>
            <div className="detailRight">
              <div className="detailTitle">获得 {likeCount} 次赞同</div>
              <div className="detailDesc">
                获得 {peopleInfo?.commentLike + peopleInfo?.momentLike} 次点赞，
                {peopleInfo?.collectCount} 次收藏
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="followInfo boxShadow">
        <div className="box" onClick={() => changePage('following')}>
          <div className="title">关注</div>
          <div className="count">{peopleInfo?.careCount}</div>
        </div>
        <div
          className="box"
          onClick={() => changePage('followers')}
          style={{ borderLeft: ' 1px solid #ebebeb' }}>
          <div className="title">粉丝</div>
          <div className="count">{peopleInfo?.fansCount}</div>
        </div>
      </div>
    </PeopleRightWrapper>
  )
})
