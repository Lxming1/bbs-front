import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppWrapper from './router'
import { setUserMes } from './store/actionCreater/userActions'

function App() {
  const dispatch = useDispatch()
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
}

export default App
