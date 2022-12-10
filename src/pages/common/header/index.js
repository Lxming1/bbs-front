import { memo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserMes } from '@/store/actionCreater/authActions'
import HeaderWrapper from './style'
import { Input, Menu, Popover, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { UserOutlined, PoweroffOutlined, BellFilled } from '@ant-design/icons'
import { setIsLogin } from '../../../store/actionCreater/authActions'

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
      key: `/people/${userInfo?.id}`,
    },
  ]

  const navigate = useNavigate()

  const search = (value) => {
    window.location.href = `#/search/moment/${value}`
  }

  const logout = () => {
    sessionStorage.removeItem('bbs-user')
    localStorage.removeItem('bbs-user')
    dispatch(setIsLogin(false))
    dispatch(setUserMes(null))
  }

  const changeRoute = (item) => {
    navigate(item.key)
  }

  const rightMenu = () => (
    <ul className="rightMenu">
      <li onClick={() => (window.location.href = `#/people/${userInfo?.id}`)}>
        <a>
          <UserOutlined style={{ marginRight: '6px' }} />
          我的主页
        </a>
      </li>
      <li onClick={logout}>
        <a href="#/login">
          <PoweroffOutlined style={{ marginRight: '6px' }} />
          退出
        </a>
      </li>
    </ul>
  )
  return (
    <HeaderWrapper>
      <div className="mainBox">
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
          <Input.Search placeholder="input search text" style={{ width: 200 }} onSearch={search} />
        </div>
        <div className="rightContent">
          {userInfo === null || Object.keys(userInfo).length === 0 ? (
            <a href="#/login" className="link link-hover text-md">
              登录
            </a>
          ) : (
            <>
              <Badge
                count={
                  userInfo?.noticeCount &&
                  Object.values(userInfo?.noticeCount).reduce((pre, v) => pre + v)
                }
                className="notices"
                size="small"
                onClick={() => navigate('/notices/reply')}>
                <BellFilled />
                <span className="title">消息</span>
              </Badge>
              <Popover placement="bottom" content={rightMenu()} trigger="hover">
                <div className="avatar">
                  <img src={userInfo?.avatar_url} alt="" />
                </div>
              </Popover>
            </>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
})
