import { memo, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCollects } from '@/store/actionCreater/homeAction'
import { useStoreInfo } from '@/hooks'
import CollectWrapper from './style'
import { Input, Radio } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { createCollect } from '@/service/collect'
import { xmMessage } from '@/utils'
import { addToCollect, cancelCollect } from '@/service/collect'
import Wrapper from '@/components/wrapper'

export default memo(({ setShowCollect, momentId }) => {
  const dispatch = useDispatch()
  const { collects } = useStoreInfo('collects')
  // 收藏夹列表
  const [collectList, setCollectList] = useState([])
  // 新建时的标题
  const [createTitle, setCreateTitle] = useState('')
  // 0 1 对应不同组件
  const [collectState, setCollectState] = useState(0)
  // 公开或私密
  const [stateCode, setStateCode] = useState(0)

  const createCollectBtn = async () => {
    if (collectList.some((item) => item.name === createTitle)) {
      xmMessage(1, '该收藏夹已存在')
      return
    }
    if (createTitle.trim() === '') return
    const result = await createCollect(createTitle, stateCode)
    if (result.code === undefined) return
    xmMessage(result.code, result.message)
    dispatch(getCollects(momentId))
    setCreateTitle('')
    setStateCode(0)
    setCollectState(0)
  }

  const collectControl = async (isCollected, id) => {
    isCollected ? await cancelCollect(id, momentId) : await addToCollect(id, momentId)
    dispatch(getCollects(momentId))
  }

  useEffect(() => {
    dispatch(getCollects(momentId))
  }, [])

  useEffect(() => {
    setCollectList(collects)
  }, [collects])

  const hidden = () => setShowCollect(() => false)

  return (
    <CollectWrapper>
      <Wrapper hidden={hidden} />
      {collectState === 0 ? (
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
              {!collectList.length ? (
                <button className="btn cancel" onClick={hidden}>
                  取消
                </button>
              ) : null}
            </div>
          </div>
          <CloseOutlined onClick={hidden} className="close" />
        </div>
      ) : (
        <div className="dialogGroup">
          <h3 className="title">创建新收藏夹</h3>
          <div className="createCollect">
            <Input
              placeholder="收藏标题"
              value={createTitle}
              onChange={(e) => setCreateTitle(e.target.value)}
            />
            <div className="setVisiable">
              <Radio.Group onChange={(e) => setStateCode(e.target.value)} value={stateCode}>
                <Radio value={0}>
                  <span>公开</span>
                  <span className="tips">所有人都可以查看这个收藏夹</span>
                </Radio>
                <Radio value={1}>
                  <span>私密</span>
                  <span className="tips">只有你自己可以查看这个收藏夹</span>
                </Radio>
              </Radio.Group>
              <div className="createBtn">
                <button className="btn back" onClick={() => setCollectState(0)}>
                  返回
                </button>
                <button
                  className={'btn create ' + (createTitle.trim().length ? '' : 'disableBtn')}
                  onClick={createCollectBtn}>
                  确认创建
                </button>
              </div>
            </div>
          </div>
          <CloseOutlined onClick={hidden} className="close" />
        </div>
      )}
    </CollectWrapper>
  )
})
