import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './common/footer'
import { Header } from './common/header'
import { useLazyLoad } from '@/hooks'

const XmHome = memo(() => {
  useLazyLoad()
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
})

export default XmHome
