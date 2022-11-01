import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { ToastEl } from './components/toast'
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
    <div className="bg-gray-50">
      <Suspense fallback={<div>page loading</div>}>
        <AppWrapper />
      </Suspense>
      <ToastEl />
    </div>
  )
}

export default App
