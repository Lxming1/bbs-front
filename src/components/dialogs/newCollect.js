import { memo, useState } from 'react'
import { Input, Radio } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Wrapper from '@/components/wrapper'
import DialogWrapper from './style'

export default memo(({ hidden, submitFn, backContent, collect, title }) => {
  // 公开或私密
  const [stateCode, setStateCode] = useState(collect?.state === undefined ? 0 : collect?.state)
  // 新建时的标题
  const [createTitle, setCreateTitle] = useState(collect?.value === undefined ? '' : collect?.value)

  const createCollectBtn = async () => {
    await submitFn(createTitle, stateCode)
    setCreateTitle('')
    setStateCode(0)
  }

  return (
    <DialogWrapper>
      <Wrapper hidden={hidden} />
      <div className="dialogGroup">
        <h3 className="title">{title}</h3>
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
              <button className="btn back" onClick={backContent?.fn}>
                {backContent.content}
              </button>
              <button
                className={'btn create ' + (createTitle.trim().length ? '' : 'disableBtn')}
                onClick={createCollectBtn}>
                确认
              </button>
            </div>
          </div>
        </div>
        <CloseOutlined onClick={hidden} className="close" />
      </div>
    </DialogWrapper>
  )
})
