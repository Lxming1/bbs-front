import { CaretUpFilled } from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import BackTopWrapper from './style'

export default memo(() => {
  const [show, setShow] = useState(false)

  const goTop = () => {
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const getScroll = () => {
      setShow(window.scrollY > 600)
    }
    window.addEventListener('scroll', getScroll)
    return () => {
      window.removeEventListener('scroll', getScroll)
    }
  }, [])

  return (
    show && (
      <BackTopWrapper onClick={goTop}>
        <CaretUpFilled />
        顶部
      </BackTopWrapper>
    )
  )
})
