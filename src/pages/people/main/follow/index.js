import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import { getCareList, getFansList } from '../../../../service/users'
import RelationBtn from '../../relationBtn'
import FollowWrapper from './style'
import { Empty } from 'antd'

export default memo(({ type }) => {
  const { profileUser } = useStoreInfo('user', 'profileUser', 'isProfile')
  const [userList, setUserList] = useState([])
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)

  const changeRelation = (newRelation, userId) => {
    const newUserList = userList.map((item) => {
      if (item.id === userId) {
        item.relation = newRelation
        // console.log(newRelation)
        // item.careCount = newRelation.care ? item.careCount + 1 : item.careCount
        // item.fansCount = newRelation.fans ? item.fansCount + 1 : item.fansCount
      }
      return item
    })
    setUserList(newUserList)
  }

  const reqFn = async () => {
    if (!profileUser?.id) return
    let result = null
    if (type === 'following') {
      result = await getCareList(profileUser?.id, pagenum, pagesize)
    } else {
      result = await getFansList(profileUser?.id, pagenum, pagesize)
    }
    const users = result.data
    setUserList(users)
  }

  useEffect(() => {
    reqFn()
    return () => {
      setUserList([])
      setPagenum(1)
    }
  }, [type])

  useEffect(() => {
    reqFn()
  }, [profileUser])

  return (
    <FollowWrapper>
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
                <div className="name">{user.name}</div>
                <div className="intro">{user.introduction}</div>
                <div className="desc">{`${user.momentCount} 动态 · ${user.fansCount} 关注者`}</div>
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
