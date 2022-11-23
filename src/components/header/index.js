import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setUserMes } from '../../store/actionCreater/userActions'
import HeaderWrapper from './style'
import { Input, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useStoreInfo } from '../../hooks'

export const Header = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState({})
  const [currentKey, setCurrentKey] = useState('/')

  const userInfo = useStoreInfo('user')

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
    dispatch(setUserMes({}))
    setUser({})
  }

  const changeRoute = (item) => {
    navigate(item.key)
  }

  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem('bbs-user'))
    const storageUser = JSON.parse(sessionStorage.getItem('bbs-user'))
    setUser(sessionUser || storageUser || {})
  }, [])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    setCurrentKey(hash.length ? hash : '/')
  }, [window.location.hash])

  return (
    <HeaderWrapper>
      <div className="wrap-v1 mainBox">
        <div className="leftContent">
          <div className="logo">
            <img src={require('../../assets/img/logo.png')} alt="PYPBBS" />
          </div>
          <Menu
            className="navigate"
            items={items}
            mode="horizontal"
            onClick={changeRoute}
            activeKey={currentKey}
          />
        </div>
        <div className="rightContent">
          <Input.Search placeholder="input search text" style={{ width: 200 }} />
          {Object.keys(user).length === 0 ? (
            <a href="#/login" className="link link-hover text-md">
              登录
            </a>
          ) : (
            <div>
              <div>
                <span>{userInfo.name}</span>
              </div>
              <a href="#/login" onClick={logout}>
                退出登录
              </a>
            </div>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
}
