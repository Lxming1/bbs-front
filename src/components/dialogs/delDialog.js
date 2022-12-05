import { memo } from 'react'
import Wrapper from '@/components/wrapper'
import DialogWrapper from './style'

export default memo(({ hidden, submitFn, backContent, tips }) => {
  const createCollectBtn = async () => {
    submitFn()
  }
  return (
    <DialogWrapper>
      <Wrapper hidden={hidden} />
      <div className="dialogGroup delDialogGroup">
        {tips.title && <h3 className="delTitle">{tips.title}</h3>}
        {tips.alert && <div className="delAlert">{tips.alert}</div>}
        {tips.desc && <div className="delDesc">{tips.desc}</div>}
        <div className="delBtn">
          <button className="btn back" onClick={backContent?.fn}>
            {backContent.content}
          </button>
          <button className="btn create" onClick={createCollectBtn}>
            确认
          </button>
        </div>
      </div>
    </DialogWrapper>
  )
})
