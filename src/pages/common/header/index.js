import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { setUserMes } from '@/store/actionCreater/userActions'
import HeaderWrapper from './style'
import { Input, Menu, Popover } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

export const Header = memo(() => {
  const dispatch = useDispatch()
  const { user: userInfo } = useStoreInfo('user')

  const items = [
    {
      label: '首页',
      key: '/',
    },
    {
      label: '我的',
      key: '/profile',
    },
  ]

  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem('bbs-user')
    localStorage.removeItem('bbs-user')
    dispatch(setUserMes(null))
  }

  const changeRoute = (item) => {
    navigate(item.key)
  }

  const rightMenu = () => (
    <ul className="rightMenu">
      <li>
        <a href="#/profile">
          <UserOutlined style={{ marginRight: '6px' }} />
          我的主页
        </a>
      </li>
      <li>
        <a href="#/login" onClick={logout}>
          <PoweroffOutlined style={{ marginRight: '6px' }} />
          退出
        </a>
      </li>
    </ul>
  )
  return (
    <HeaderWrapper>
      <div className="wrap-v1 mainBox">
        <div className="leftContent">
          <div className="logo">
            <img src={require('@/assets/img/logo.png')} alt="PYPBBS" />
          </div>
          <Menu
            className="navigate"
            style={{ fontWeight: 'bold' }}
            items={items}
            mode="horizontal"
            onClick={changeRoute}
            defaultSelectedKeys={['/']}
          />
        </div>
        <div className="centerContent">
          <Input.Search placeholder="input search text" style={{ width: 200 }} />
        </div>
        <div className="rightContent">
          {userInfo === null || Object.keys(userInfo).length === 0 ? (
            <a href="#/login" className="link link-hover text-md">
              登录
            </a>
          ) : (
            <Popover placement="bottom" content={rightMenu()} trigger="click">
              <div className="avatar">
                <img src={userInfo.avatar_url} alt="" />
              </div>
            </Popover>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
})
