import { memo, useEffect, useState } from 'react'
import MainWrapper from './style'
import { Tabs, Menu } from 'antd'
import Moments from './moments'
import Collects from './collects'
import { useStoreInfo } from '@/hooks'
import { Outlet } from 'react-router-dom'

const People = memo(() => {
  const { user } = useStoreInfo('user')
  const [currentIndex, setCurrentIndex] = useState(0)

  const baseUrl = `/people/${user?.id}`
  const items = [
    { label: '动态', href: '' },
    { label: '收藏', href: `/collections` },
    { label: '关注', href: `/following` },
  ]
  // const items = [
  //   { label: '动态', key: baseUrl, children: <Moments /> },
  //   { label: '收藏', key: `${baseUrl}/collections`, children: <Collects /> },
  //   { label: '关注', key: `${baseUrl}/following` },
  // ]

  const changePage = (index, href) => {
    setCurrentIndex(index)
    window.location.href = href
  }

  return (
    <MainWrapper>
      <div className="leftContent boxShadow">
        {/* <Tabs items={items} /> */}
        <ul className="tabs">
          {items.map((item, index) => (
            <li key={item.label} onClick={() => changePage(index, `#${baseUrl}${item.href}`)}>
              <span className={index === currentIndex ? 'tabs-active' : ''}>{item.label}</span>
            </li>
          ))}
        </ul>
        <Outlet />
      </div>
      <div className="rightContent boxShadow"></div>
    </MainWrapper>
  )
})

export default People
