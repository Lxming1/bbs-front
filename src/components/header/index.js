import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUserMes } from '../../store/actionCreater/userActions'
import { Search } from './cpn/search'
import { Select } from './cpn/select'

export const Header = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const logout = () => {
    sessionStorage.removeItem('bbs-user')
    localStorage.removeItem('bbs-user')
    dispatch(setUserMes({}))
    setUser({})
  }

  const rightContent = () => {
    return Object.keys(user).length === 0 ? (
      <a href="/login" className="link link-hover text-md">
        登录
      </a>
    ) : (
      <div>
        <div className="avatar placeholder hover:cursor-default">
          <div className="bg-neutral-focus text-neutral-content rounded-full p-2">
            <span className="text-base">小白</span>
          </div>
        </div>
        <a className="link link-hover text-neutral ml-2" onClick={logout}>
          退出登录
        </a>
      </div>
    )
  }

  useEffect(() => {
    const sessionUser = JSON.parse(localStorage.getItem('bbs-user'))
    const storageUser = JSON.parse(sessionStorage.getItem('bbs-user'))

    setUser(sessionUser || storageUser || {})
  }, [])

  return (
    <div className="h-24 bg-gray-50 text-white font-bold px-28 flex items-center border border-0 border-b-2 shadow-sm">
      <div className="flex-1 h-24 flex items-center justify-between">
        <img src={require('../../assets/img/logo.png')} alt="PYPBBS" className="h-3/4" />

        <div className="flex items-center">
          <Select />
          <Search />
        </div>
      </div>
      <div className="flex-1 flex items-center px-10">{rightContent()}</div>
    </div>
  )
}
