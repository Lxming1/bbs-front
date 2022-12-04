import { memo, useEffect, useState } from 'react'
import MainWrapper from './style'
import { Tabs } from 'antd'
import Moments from './moments'
import Collects from './collects'

const People = memo(() => {
  const tabItems = [
    { label: '动态', key: 'item-1', children: <Moments /> }, // 务必填写 key
    { label: '收藏', key: 'item-2', children: <Collects /> },
    { label: '关注', key: 'item-3', children: '内容 2' },
  ]
  return (
    <MainWrapper>
      <div className="leftContent boxShadow">
        <div className="tab">
          <Tabs items={tabItems} />
        </div>
      </div>
      <div className="rightContent boxShadow"></div>
    </MainWrapper>
  )
})

export default People
