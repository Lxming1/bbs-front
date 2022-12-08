import { MailFilled } from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import NoticesWrapper from './style'
import { Outlet } from 'react-router-dom'

export default memo(() => {
  const [currentHref, setCurrentHref] = useState('#/notices/reply')

  const items = [
    {
      label: '回复我的',
      key: '#/notices/reply',
    },
    {
      label: '收到的赞',
      key: '#/notices/praise',
    },
    {
      label: '关注我的',
      key: '#/notices/follow',
    },
  ]

  useEffect(() => {
    if (window.location.hash === '#/notices') {
      window.location.href = '#/notices/reply'
    }
  }, [])

  return (
    <NoticesWrapper>
      <div className="leftNav boxShadow">
        <div className="title">
          <MailFilled /> 消息中心
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.key} className={item.key === currentHref ? 'active' : ''}>
              <a href={item.key} onClick={() => setCurrentHref(item.key)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="rightContent">
        <div className="title boxShadow">
          {items.find((item) => item.key === currentHref).label}
        </div>
        <div className="mainContent boxShadow">
          <Outlet />
        </div>
      </div>
    </NoticesWrapper>
  )
})
