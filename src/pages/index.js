import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from './common/footer'
import { Header } from './common/header'

const XmHome = memo(() => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
})

export default XmHome
