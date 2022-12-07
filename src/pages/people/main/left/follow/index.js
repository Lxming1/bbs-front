import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import { getCareList, getFansList } from '@/service/users'
import RelationBtn from '../../../relationBtn'
import FollowWrapper from './style'
import { Empty } from 'antd'
import { useDispatch } from 'react-redux'
import { setProfileUser } from '../../../../../store/actionCreater/peopleAction'

export default memo(({ type }) => {
  const { profileUser: peopleInfo, isProfile } = useStoreInfo('user', 'profileUser', 'isProfile')
  const [userList, setUserList] = useState([])
  const dispatch = useDispatch()
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)

  const baseUrl = `/people/${peopleInfo?.id}`

  const changeRelation = (newRelation, userId) => {
    const people = { ...peopleInfo }
    const newUserList = userList.map((item) => {
      if (item.id === userId) {
        if (item.relation.care && !newRelation.care) {
          people.careCount--
        } else if (!item.relation.care && newRelation.care) {
          people.careCount++
        }
        item.relation = newRelation
      }
      return item
    })
    setUserList(newUserList)
    dispatch(setProfileUser(people))
  }

  const reqFn = async () => {
    if (!peopleInfo?.id) return
    let result = null
    if (type === 'following') {
      result = await getCareList(peopleInfo?.id, pagenum, pagesize)
    } else {
      result = await getFansList(peopleInfo?.id, pagenum, pagesize)
    }
    const users = result.data
    setUserList(users)
  }
  const followClassControl = (type) =>
    window.location.hash === `#${baseUrl}/${type}` ? 'head-active' : ''

  const gender = isProfile ? '我' : !peopleInfo?.gender ? '他' : '她'

  const changePage = (href) => {
    window.location.href = href
  }

  useEffect(() => {
    reqFn()
    return () => {
      setUserList([])
      setPagenum(1)
    }
  }, [type])

  // useEffect(() => {
  //   reqFn()
  // }, [peopleInfo])

  return (
    <FollowWrapper>
      <div className="people-header">
        <div
          className={followClassControl('following')}
          onClick={() => changePage(`#${baseUrl}/following`)}>
          {gender}关注的人
        </div>
        <div
          className={followClassControl('followers')}
          onClick={() => changePage(`#${baseUrl}/followers`)}>
          关注{gender}的人
        </div>
      </div>
      {userList.length ? (
        userList?.map((user) => (
          <div className="userListItem" key={user.id}>
            <div className="itemLeft">
              <div className="userLeft">
                <img
                  src={user.avatar_url}
                  alt={user.name}
                  onClick={() => (window.location.href = `#/people/${user.id}`)}
                />
              </div>
              <div className="userRight">
                <div
                  className="name"
                  onClick={() => (window.location.href = `#/people/${user.id}`)}>
                  {user.name}
                </div>
                <div className="intro">{user.introduction}</div>
                <div className="desc">
                  {user.momentCount && `${user.momentCount} 条动态 · `}
                  {`${user.fansCount} 关注者`}
                </div>
              </div>
            </div>
            <div className="rightBtn">
              <RelationBtn
                relation={user?.relation}
                newRelation={changeRelation}
                peopleInfo={user}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="empty">
          <Empty description="还没有关注的用户" />
        </div>
      )}
    </FollowWrapper>
  )
})
