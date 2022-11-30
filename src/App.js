import { memo, Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppWrapper from './router'
import { setUserMes } from './store/actionCreater/authActions'

export default memo(function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    let userInfo = sessionStorage.getItem('bbs-user') || localStorage.getItem('bbs-user')
    userInfo = JSON.parse(userInfo)
    dispatch(setUserMes(userInfo))
  }, [])

  return (
    <div>
      <Suspense fallback={<div>page loading</div>}>
        <AppWrapper />
      </Suspense>
    </div>
  )
})
