import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { Empty } from 'antd'
import { useStoreInfo } from '@/hooks'
import { setProfileUser } from '@/store/actionCreater/peopleAction'
import RelationBtn from '@/components/relationBtn'
import UserListWrapper from './style'

export default memo(({ userList, setUserList }) => {
  const { profileUser: peopleInfo } = useStoreInfo('user', 'profileUser')
  const dispatch = useDispatch()
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
  return (
    <UserListWrapper>
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
                  {user.momentCount !== 0 && `${user.momentCount} 条动态 · `}
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
    </UserListWrapper>
  )
})
