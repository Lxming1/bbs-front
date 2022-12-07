import { DeleteFilled, FormOutlined, LockFilled, PlusOutlined } from '@ant-design/icons'
import { memo, React, useEffect, useState } from 'react'
import CollectDialog from '@/components/dialogs/newCollect'
import CollectWrapper from './style'
import { createCollect, editCollect, getCollectByUid } from '@/service/collect'
import { useParams } from 'react-router-dom'
import { Empty } from 'antd'
import dayjs from 'dayjs'
import { xmMessage } from '@/utils'
import DelDialog from '@/components/dialogs/delDialog'
import { delCollect } from '@/service/collect'
import { useStoreInfo } from '@/hooks'
import ProfileCollectionBtn from './profileCollectionBtn'

export default memo(() => {
  const { profileUser, isProfile } = useStoreInfo('user', 'profileUser', 'isProfile')
  const [dialogStateCode, setDialogStateCode] = useState(null)
  const [currentCollect, setCurrentCollect] = useState({})
  const [collects, setCollects] = useState([])

  const showCreateDialog = () => setDialogStateCode(0)

  const hidden = () => setDialogStateCode(null)

  const getCollectList = async () => {
    if (!profileUser?.id) return
    const result = await getCollectByUid(profileUser?.id)
    setCollects(result.data)
  }

  const backContent = {
    content: '取消',
    fn: hidden,
  }

  const editCollectBtn = (collect) => {
    setCurrentCollect({
      id: collect.id,
      value: collect.name,
      state: collect.status,
    })
    setDialogStateCode(1)
  }
  const delCollectBtn = (collect) => {
    setCurrentCollect({
      id: collect.id,
    })
    setDialogStateCode(2)
  }

  const submitFn = async (fn, title) => {
    if (title?.trim() === '') return
    const result = await fn()
    if (result.code === undefined) return
    xmMessage(result.code, result.message)
    await getCollectList()
    hidden()
  }

  const delSubmitFn = () => submitFn(() => delCollect(currentCollect.id))

  const editSubmitFn = (title, code) => {
    submitFn(() => editCollect(currentCollect.id, title, code), title)
  }

  const newSubmitFn = async (title, code) => {
    if (collects.some((item) => item.name === title)) {
      xmMessage(1, '该收藏夹已存在')
      return
    }
    submitFn(() => createCollect(title, code), title)
  }

  const tips = {
    title: '删除收藏夹',
    alert: '你确认要删除这个收藏夹吗？',
    desc: '删除收藏夹后，里面收藏的内容也一并删除',
  }

  useEffect(() => {
    getCollectList()
  }, [profileUser])

  return (
    <CollectWrapper>
      <div className="people-header">
        <div className="head-active">
          {isProfile ? '我' : !profileUser?.gender ? '他' : '她'}的收藏夹
        </div>
        {isProfile && (
          <div className="newCollect" onClick={showCreateDialog}>
            <PlusOutlined />
            新建收藏夹
          </div>
        )}
      </div>
      <div className="people-collect">
        {collects?.length ? (
          collects?.map((item) => (
            <div className="collectItem" key={item.id}>
              <a href={`#/collection/${item.id}`} className="collectItemTitle">
                {item.name} {item.status === 1 && <LockFilled />}
              </a>
              <div className="collectItemDetail">
                <div className="time">
                  {`${dayjs(item.createTime).format('YYYY-MM-DD')} 更新 · ${item.count} 条内容`}
                </div>
                {isProfile && (
                  <ProfileCollectionBtn
                    editCollectBtn={() => editCollectBtn(item)}
                    delCollectBtn={() => delCollectBtn(item)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty">
            <Empty description="还没有创建收藏夹" />
          </div>
        )}
      </div>
      {isProfile && (
        <>
          {dialogStateCode === 0 && (
            <CollectDialog
              title="创建新收藏夹"
              backContent={backContent}
              hidden={hidden}
              submitFn={newSubmitFn}
            />
          )}
          {dialogStateCode === 1 && (
            <CollectDialog
              submitFn={editSubmitFn}
              title="编辑收藏夹"
              backContent={backContent}
              collect={currentCollect}
              hidden={hidden}
            />
          )}
          {dialogStateCode === 2 && (
            <DelDialog backContent={backContent} submitFn={delSubmitFn} tips={tips} />
          )}
        </>
      )}
    </CollectWrapper>
  )
})
