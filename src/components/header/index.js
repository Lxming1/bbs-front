import { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getPlateList } from '../../service/plate'
import { setUserMes } from '../../store/actionCreater/userActions'
import { Search } from './cpn/search'
import HeaderWrapper from './style'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Menu } from 'antd'
import { Moment } from '../../pages/moment'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const { userInfo } = useSelector(
    (state) => ({
      userInfo: state.get('user'),
    }),
    shallowEqual
  )

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

  return (
    <HeaderWrapper>
      <div className="wrap-v1 mainBox">
        <div className="leftContent">
          <div className="logo">
            <img src={require('../../assets/img/logo.png')} alt="PYPBBS" />
          </div>
          <Menu className="navigate" items={items} mode="horizontal" onClick={changeRoute} />
        </div>
        <div className="rightContent">
          <Input.Search placeholder="input search text" style={{ width: 200 }} />
          {Object.keys(user).length === 0 ? (
            <a href="/login" className="link link-hover text-md">
              登录
            </a>
          ) : (
            <div>
              <div>
                <span>{userInfo.name}</span>
              </div>
              <a href="/login" onClick={logout}>
                退出登录
              </a>
            </div>
          )}
        </div>
      </div>
    </HeaderWrapper>
  )
}
