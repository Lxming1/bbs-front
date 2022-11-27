import { memo, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppWrapper from './router'
import { setUserMes } from './store/actionCreater/userActions'

export default memo(function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    let userInfo = sessionStorage.getItem('bbs-user') || localStorage.getItem('bbs-user')
    userInfo = JSON.parse(userInfo)
    dispatch(setUserMes(userInfo))
    navigate('/')
  }, [])

  return (
    <div>
      <Suspense fallback={<div>page loading</div>}>
        <AppWrapper />
      </Suspense>
    </div>
  )
})
