import { DeleteFilled, FormOutlined } from '@ant-design/icons'
import { memo } from 'react'

export default memo(({ editCollectBtn, delCollectBtn }) => {
  return (
    <div className="operation">
      <div className="editCollect" onClick={editCollectBtn}>
        <FormOutlined />
        编辑
      </div>
      <div className="delCollect" onClick={delCollectBtn}>
        <DeleteFilled />
        删除
      </div>
    </div>
  )
})
