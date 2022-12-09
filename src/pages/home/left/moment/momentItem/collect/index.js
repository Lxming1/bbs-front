import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import { addToCollect, cancelCollect, getCollectByUid } from '@/service/collect'
import NewCollect from '@/components/dialogs/newCollect'
import ShowCollect from '@/components/dialogs/showCollect'
import { xmMessage } from '@/utils'
import { createCollect } from '@/service/collect'

export default memo(({ setShowCollect, momentId }) => {
  const { user } = useStoreInfo('user')
  // 收藏夹列表
  const [collectList, setCollectList] = useState([])
  // 0 1 对应不同组件
  const [collectState, setCollectState] = useState(0)

  const getCollectList = async () => {
    const result = await getCollectByUid(user.id, momentId)
    setCollectList(result.data)
  }

  const collectControl = async (isCollected, id) => {
    isCollected ? await cancelCollect(id, momentId) : await addToCollect(id, momentId)
    getCollectList(momentId)
  }

  useEffect(() => {
    getCollectList()
  }, [])

  const hidden = () => setShowCollect(() => false)

  const submitFn = async (title, code) => {
    if (collectList.some((item) => item.name === title)) {
      xmMessage(1, '该收藏夹已存在')
      return
    }
    if (title.trim() === '') return
    const result = await createCollect(title, code)
    xmMessage(result.code, result.message)
    await getCollectList()
    setCollectState(0)
  }

  const backContent = {
    content: '返回',
    fn: () => setCollectState(0),
  }

  return (
    <div>
      {collectState === 0 ? (
        <ShowCollect
          collectList={collectList}
          collectControl={collectControl}
          setCollectState={setCollectState}
          hidden={hidden}
        />
      ) : (
        <NewCollect
          submitFn={submitFn}
          backContent={backContent}
          collectList={collectList}
          hidden={hidden}
          title="创建新收藏夹"
        />
      )}
    </div>
  )
})
