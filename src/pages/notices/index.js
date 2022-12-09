import { MailFilled } from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import NoticesWrapper from './style'
import { Outlet } from 'react-router-dom'
import { useStoreInfo } from '../../hooks'

export default memo(() => {
  const { user } = useStoreInfo('user')
  const [currentHash, setCurrentHash] = useState('#/notices/reply')

  const getNoticeCount = (type) => user?.noticeCount[type]

  const items = [
    {
      label: '回复我的',
      key: '#/notices/reply',
      count: getNoticeCount('reply'),
    },
    {
      label: '收到的赞',
      key: '#/notices/praise',
      count: getNoticeCount('praise'),
    },
    {
      label: '关注我的',
      key: '#/notices/follow',
      count: getNoticeCount('follow'),
    },
  ]

  useEffect(() => {
    setCurrentHash(window.location.hash)
  }, [window.location.hash])

  return (
    <NoticesWrapper>
      <div className="leftNav boxShadow">
        <div className="title">
          <MailFilled /> 消息中心
        </div>
        <ul>
          {items.map((item) => (
            <li key={item.key} className={item.key === currentHash ? 'active' : ''}>
              <a href={item.key} onClick={() => setCurrentHash(item.key)}>
                {item?.label}
              </a>
              {item?.count !== 0 && <div className="count">{item?.count}</div>}
            </li>
          ))}
        </ul>
      </div>
      <div className="rightContent">
        <div className="title boxShadow">
          {items.find((item) => item.key === currentHash)?.label}
        </div>
        <div className="mainContent boxShadow">
          <Outlet />
        </div>
      </div>
    </NoticesWrapper>
  )
})
