import { memo } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import Wrapper from '@/components/wrapper'
import DialogWrapper from './style'

export default memo(({ hidden, collectList, collectControl, setCollectState }) => {
  return (
    <DialogWrapper>
      <Wrapper hidden={hidden} />
      <div className="dialogGroup">
        <div className="collect">
          <div className="header">
            <h3 className="title">添加收藏</h3>
            <div className="desc">
              {collectList.length
                ? '请选择你想添加的收藏夹'
                : '你可以创建多个收藏夹，将答案分类收藏'}
            </div>
          </div>
          {collectList.length !== 0 && (
            <div className="list">
              <ul>
                {collectList?.map((item) => (
                  <div key={item.id} className="item">
                    <div className="left">
                      <div className="name">{item.name}</div>
                      <div className="count">{item.count} 条内容</div>
                    </div>
                    <button
                      className={'btn ' + (item.isCollected ? 'collectedBtn' : 'collectBtn')}
                      onClick={() => collectControl(item.isCollected, item.id)}>
                      {item.isCollected ? '已收藏' : '收藏'}
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          )}
          <div className="btnGroup">
            <button className="btn create" onClick={() => setCollectState(1)}>
              创建收藏夹
            </button>
            {!collectList?.length ? (
              <button className="btn cancel" onClick={hidden}>
                取消
              </button>
            ) : null}
          </div>
        </div>
        <CloseOutlined onClick={hidden} className="close" />
      </div>
    </DialogWrapper>
  )
})
