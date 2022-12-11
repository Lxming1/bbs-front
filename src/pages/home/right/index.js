import { memo, useEffect, useState } from 'react'
import RightWrapper from './style'
import { useStoreInfo } from '@/hooks'
import { debounce, verifyLogin, xmMessage } from '../../../utils'
import {
  CheckOutlined,
  PlusOutlined,
  ProfileFilled,
  StarFilled,
  SwapOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { setPeopleIndex } from '../../../store/actionCreater/peopleAction'
import { cancelCare, care, userTopList } from '../../../service/users'

const Right = memo(() => {
  const { isLogin, user } = useStoreInfo('isLogin', 'user')
  const dispatch = useDispatch()
  const [userList, setUserList] = useState([])

  const createMoment = async () => {
    await verifyLogin(isLogin)
    window.location.href = '#/moment/new'
  }
  const baseHref = `#/people/${user?.id}`
  const items = [
    {
      label: '我的动态',
      icon: <ProfileFilled />,
      count: user?.momentCount,
      href: baseHref,
      index: 0,
    },
    {
      label: '我的收藏',
      icon: <StarFilled />,
      count: user?.collectCount,
      href: `${baseHref}/collections`,
      index: 1,
    },
    {
      label: '我的关注',
      icon: <UsergroupAddOutlined />,
      count: user?.careCount,
      href: `${baseHref}/following`,
      index: 2,
    },
    {
      label: '我的粉丝',
      icon: <UsergroupAddOutlined />,
      count: user?.fansCount,
      href: `${baseHref}/followers`,
      index: 2,
    },
  ]

  const careU = debounce(
    async (id) => {
      await verifyLogin(isLogin)
      if (id === user.id) return xmMessage(1, '您不能关注您自己')
      await care(id)
      reqFn()
    },
    300,
    true
  )

  const cancelCareU = debounce(
    async (id) => {
      await verifyLogin(isLogin)
      await cancelCare(id)
      reqFn()
    },
    300,
    true
  )

  const changPage = async (e, item) => {
    e.preventDefault()
    await verifyLogin(isLogin)
    dispatch(setPeopleIndex(item.index))
    window.location.href = item.href
  }

  const reqFn = async () => {
    const result = await userTopList()
    setUserList(result.data)
  }

  const goProfile = (id) => {
    window.location.href = `#/people/${id}`
  }

  useEffect(() => {
    reqFn()
  }, [])

  return (
    <RightWrapper>
      <div className="rightOne">
        <button className="sendBtn" onClick={createMoment}>
          发表动态
        </button>
      </div>
      <div className="userToplist boxShadow">
        <div className="header">
          <UserAddOutlined />
          推荐关注
        </div>
        <ul>
          {userList?.map((item) => (
            <li key={item.id}>
              <div className="left">
                <img src={item.avatar_url} alt="" onClick={() => goProfile(item.id)} />
                <div className="content">
                  <span className="name" onClick={() => goProfile(item.id)}>
                    {item.name}
                  </span>
                  <span className="desc text-nowrap">{item.introduction}</span>
                </div>
              </div>
              <div className="relation">
                {item.relation?.care && item.relation?.fan ? (
                  <div className="gray btn" onClick={() => cancelCareU(item.id)}>
                    <SwapOutlined />
                    互相关注
                  </div>
                ) : item.relation?.care ? (
                  <div className="gray btn" onClick={() => cancelCareU(item.id)}>
                    <CheckOutlined />
                    已关注
                  </div>
                ) : (
                  <div className="blue btn" onClick={() => careU(item.id)}>
                    <PlusOutlined />
                    关注
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="rightTwo boxShadow">
        <ul>
          {items.map((item) => (
            <li key={item.label}>
              <a href="#" onClick={(e) => changPage(e, item)}>
                <span className="title">
                  {item.icon}
                  <span className="label">{item.label}</span>
                </span>
                {item.count !== undefined && <span className="count">{item.count}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </RightWrapper>
  )
})

export default Right
