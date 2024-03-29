import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserMes } from '@/store/actionCreater/authActions'
import HeaderWrapper from './style'
import { Input, Menu, Popover, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { UserOutlined, PoweroffOutlined, BellFilled, SearchOutlined } from '@ant-design/icons'
import { setIsLogin } from '../../../store/actionCreater/authActions'

export const Header = memo(() => {
  const dispatch = useDispatch()
  const { user: userInfo, plateId } = useStoreInfo('user', 'plateId')
  const [isFocu, setIsFocu] = useState(false)
  const [searchContent, setSearchContent] = useState('')

  const items = [
    {
      label: '首页',
      href: '#/',
    },
    {
      label: '我的',
      href: `#/people/${userInfo?.id}`,
    },
  ]

  const navigate = useNavigate()

  const search = () => {
    window.location.href = searchContent.trim() === '' ? `#/` : `#/search/moment/${searchContent}`
  }

  const logout = () => {
    sessionStorage.removeItem('bbs-user')
    localStorage.removeItem('bbs-user')
    dispatch(setIsLogin(false))
    dispatch(setUserMes(null))
  }

  const changeRoute = (href) => {
    setSearchContent('')
    window.location.href = href
  }

  const classControl = (href) => {
    if (
      ![window.location.hash.indexOf(href), href.indexOf(`#/people/${userInfo?.id}`)].includes(
        -1
      ) ||
      [href, `${href}${plateId}`].includes(window.location.hash) ||
      (href === '#/' && window.location.hash === '')
    ) {
      return 'tabs-active'
    }
    return ''
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
          <a href="/#" className="logo">
            <img src={require('@/assets/img/logo.png')} alt="BBS" />
          </a>
          <ul className="tabs">
            {items.map((item) => (
              <li key={item.label} onClick={() => changeRoute(item.href)}>
                <span className={classControl(item.href)}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="centerContent">
          <form className={`search ${isFocu ? 'boxBgc' : ''}`}>
            <Input
              placeholder="搜索"
              type="text"
              className={`searchInput ${isFocu ? 'isFocus' : ''}`}
              onClick={() => setIsFocu(true)}
              onBlur={() => setIsFocu(false)}
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
            />
            <div className="searchIcon" onClick={search}>
              <SearchOutlined />
            </div>
          </form>
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
