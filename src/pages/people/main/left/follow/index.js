import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import { getCareList, getFansList } from '@/service/users'
import RelationBtn from '@/components/relationBtn'
import FollowWrapper from './style'
import { Empty, Pagination } from 'antd'
import { useDispatch } from 'react-redux'
import UserList from '@/components/userList'

export default memo(({ type }) => {
  const { profileUser: peopleInfo, isProfile } = useStoreInfo('user', 'profileUser', 'isProfile')
  const [userList, setUserList] = useState([])
  const [total, setTotal] = useState(0)
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)

  const baseUrl = `/people/${peopleInfo?.id}`

  const reqFn = async (pagenum) => {
    if (!peopleInfo?.id) return
    let result = null
    if (type === 'following') {
      result = await getCareList(peopleInfo?.id, pagenum, pagesize)
    } else {
      result = await getFansList(peopleInfo?.id, pagenum, pagesize)
    }
    const { total, followList } = result.data
    setTotal(total)
    setUserList(followList)
  }

  const changUser = (page) => {
    window.scrollTo(0, 0)
    setPagenum(page)
    reqFn(page)
  }

  const followClassControl = (type) =>
    window.location.hash === `#${baseUrl}/${type}` ? 'head-active' : ''

  const gender = isProfile ? '我' : !peopleInfo?.gender ? '他' : '她'

  const changePage = (href) => {
    window.location.href = href
  }

  useEffect(() => {
    reqFn(1)
    return () => {
      setUserList([])
      setPagenum(1)
    }
  }, [type, peopleInfo])

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
      <div className="userList">
        <UserList userList={userList} setUserList={setUserList} />
      </div>
      <Pagination
        hideOnSinglePage
        className="pagination"
        total={total}
        showSizeChanger={false}
        current={pagenum}
        onChange={(page) => changUser(page)}
      />
    </FollowWrapper>
  )
})
