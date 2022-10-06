import { useDispatch, useSelector } from 'react-redux'
import { Search } from './cpn/search'
import { Select } from './cpn/select'

export const Header = () => {
  const user = JSON.parse(localStorage.getItem('bbs-user'))
  const isLogin = user !== {}

  const userMes = () => {
    return (
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src="https://placeimg.com/192/192/people" />
        </div>
        <div className="link link-hover">退出登录</div>
      </div>
    )
  }

  const rightContent = () => {
    return !isLogin ? (
      <a href="/login" className="link link-hover text-md hover:text-gray">
        登录
      </a>
    ) : (
      userMes()
    )
  }

  return (
    <div className="h-24 bg-gray-50 text-white font-bold px-28 flex items-center border border-0 border-b-2 shadow-sm">
      <div className="w-3/5 flex items-center justify-between">
        <div>
          <img src={require('../../assets/img/logo.png')} alt="PYPBBS" className="h-32" />
        </div>
        <div className="flex items-center">
          <Select />
          <Search />
        </div>
      </div>
      <div className="flex items-center">{rightContent()}</div>
    </div>
  )
}
