import { memo, useEffect, useState } from 'react'
import MainWrapper from './style'
import { Tabs, Menu } from 'antd'
import Moments from './moments'
import Collects from './collects'
import { useStoreInfo } from '@/hooks'
import { Outlet } from 'react-router-dom'

const People = memo(({ peopleInfo }) => {
  const { isProfile } = useStoreInfo('isProfile')
  const baseUrl = `/people/${peopleInfo?.id}`
  const [currentHref, setCurrentHref] = useState(`#${baseUrl}`)
  const items = [
    { label: '动态', href: `#${baseUrl}` },
    { label: '收藏', href: `#${baseUrl}/collections` },
    { label: '关注', href: `#${baseUrl}/following` },
  ]
  const gender = isProfile ? '我' : !peopleInfo?.gender ? '他' : '她'
  // const items = [
  //   {
  //     label: '动态',
  //     key: baseUrl,
  //     children: <Moments isProfile={isProfile} peopleInfo={peopleInfo} />,
  //   },
  //   {
  //     label: '收藏',
  //     key: `${baseUrl}/collections`,
  //     children: <Collects isProfile={isProfile} peopleInfo={peopleInfo} />,
  //   },
  //   { label: '关注', key: `${baseUrl}/following` },
  // ]

  const changePage = (href) => {
    setCurrentHref(href)
    window.location.href = href
  }

  const followClassControl = (type) => (currentHref === `#${baseUrl}/${type}` ? 'head-active' : '')

  useEffect(() => {
    setCurrentHref(window.location.hash)
  }, [window.location.href])

  return (
    <MainWrapper>
      <div className="leftContent boxShadow">
        {/* <Tabs items={items} /> */}
        <ul className="tabs">
          {items.map((item) => (
            <li key={item.label} onClick={() => changePage(item.href)}>
              <span className={item.href === currentHref ? 'tabs-active' : ''}>{item.label}</span>
            </li>
          ))}
        </ul>
        {[`#${baseUrl}/following`, `#${baseUrl}/followers`].includes(currentHref) && (
          <div className="people-header">
            <div
              className={followClassControl('following')}
              onClick={() => changePage(`#${baseUrl}/following`)}>
              {gender}关注的人
            </div>
            <div
              className={followClassControl('followers')}
              onClick={() => changePage(`#${baseUrl}/followers`)}>
              关注{gender}的人
            </div>
          </div>
        )}
        <Outlet />
      </div>
      <div className="rightContent boxShadow"></div>
    </MainWrapper>
  )
})

export default People
