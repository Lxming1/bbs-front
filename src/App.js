import { memo, Suspense } from 'react'
import { useDispatch } from 'react-redux'
import AppWrapper from './router'
import { setUserMes, setIsLogin } from './store/actionCreater/authActions'
import { Header } from './pages/common/header'

export default memo(function App() {
  const dispatch = useDispatch()
  let userInfo = sessionStorage.getItem('bbs-user') || localStorage.getItem('bbs-user')
  userInfo = JSON.parse(userInfo)
  dispatch(setIsLogin(userInfo !== null))
  dispatch(setUserMes(userInfo))

  return (
    <div>
      <Header />
      <Suspense fallback={<div>page loading</div>}>
        <AppWrapper />
      </Suspense>
    </div>
  )
})
