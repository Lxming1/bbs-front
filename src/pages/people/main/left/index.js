import { memo } from 'react'
import PeopleLeftWrapper from './style'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPeopleIndex } from '@/store/actionCreater/peopleAction'

export default memo(({ peopleInfo, peopleIndex }) => {
  const dispatch = useDispatch()

  const baseUrl = `/people/${peopleInfo?.id}`

  const items = [
    { label: '动态', href: `#${baseUrl}` },
    { label: '收藏', href: `#${baseUrl}/collections` },
    { label: '关注', href: `#${baseUrl}/following` },
  ]
  const changePage = (index, href) => {
    dispatch(setPeopleIndex(index))
    window.location.href = href
  }

  return (
    <PeopleLeftWrapper>
      <ul className="tabs">
        {items.map((item, index) => (
          <li key={item.label} onClick={() => changePage(index, item.href)}>
            <span className={index === peopleIndex ? 'tabs-active' : ''}>{item.label}</span>
          </li>
        ))}
      </ul>
      <Outlet />
    </PeopleLeftWrapper>
  )
})
