import { memo, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCollectDetail } from '@/service/collect'
import CollectDetailWrapper from './style'
import ProfileBtn from '../profileCollectionBtn'
import CollectDialog from '@/components/dialogs/newCollect'
import { createCollect, editCollect, getCollectByUid } from '@/service/collect'
import { xmMessage } from '@/utils'
import DelDialog from '@/components/dialogs/delDialog'
import { delCollect } from '@/service/collect'
import { useStoreInfo } from '@/hooks'
import { Empty } from 'antd'
import MomentItem from '@/pages/home/left/moment/momentItem'
import dayjs from 'dayjs'

export default memo(() => {
  const { user, isLogin } = useStoreInfo('user', 'isLogin')
  const { collectId } = useParams()
  const [collectInfo, setCollectInfo] = useState({})
  const [collectList, setCollectList] = useState([])
  const [isProfile, setIsProfile] = useState(false)
  const [dialogStateCode, setDialogStateCode] = useState(null)
  let [collectMoments, setCollectMoments] = useState([])
  setCollectMoments = useCallback(setCollectMoments, [])

  const reqFn = async () => {
    const result = await getCollectDetail(collectId)
    setCollectInfo(result.data)
    setCollectMoments(result.data.children)
    return result.data.author.id
  }
  const getCollectList = async (id) => {
    const result = await getCollectByUid(id)
    setCollectList(result.data)
  }

  const hidden = () => setDialogStateCode(null)

  const title = `${isProfile ? '我' : !collectInfo?.author?.gender ? '他' : '她'}的收藏夹`

  const tips = {
    title: '删除收藏夹',
    alert: '你确认要删除这个收藏夹吗？',
    desc: '删除收藏夹后，里面收藏的内容也一并删除',
  }

  const backContent = {
    content: '取消',
    fn: hidden,
  }

  const submitFn = async (fn, title) => {
    if (title?.trim() === '') return
    const falg = await fn()
    if (!falg) return
    await reqFn()
    hidden()
  }

  const delSubmitFn = () => {
    submitFn(async () => {
      await delCollect(collectInfo.id)
      window.location.href = `#/people/${collectInfo.uid}`
      return false
    })
  }

  const editSubmitFn = (name, status) => {
    submitFn(() => editCollect(collectInfo.id, name, status), name)
  }

  const editCollectBtn = () => setDialogStateCode(0)
  const delCollectBtn = () => setDialogStateCode(1)

  useEffect(() => {
    reqFn().then((id) => {
      window.scrollTo(0, 0)
      getCollectList(id)
    })
  }, [collectId])

  useEffect(() => {
    setIsProfile(isLogin && user?.id === collectInfo.uid)
  }, [user, isLogin, collectInfo])

  return (
    <CollectDetailWrapper>
      <div className="collectLeft">
        <div className="collectHeader boxShadow">
          <div className="name">{collectInfo?.name}</div>
          <div className="desc">{`创建于 ${collectInfo?.createTime?.substring(0, 10)}`}</div>
          {isProfile && (
            <div className="profileBtn collectItemDetail">
              <ProfileBtn editCollectBtn={editCollectBtn} delCollectBtn={delCollectBtn} />
            </div>
          )}
        </div>
        <div className="collectMoments boxShadow">
          <div className="collectCount">{collectInfo?.count}个内容</div>
          {collectMoments?.length ? (
            collectMoments?.map((item) => (
              <MomentItem moment={item} setCurrentMoments={setCollectMoments} key={item.id} />
            ))
          ) : (
            <div className="empty">
              <Empty />
            </div>
          )}
        </div>
      </div>
      <div className="collectRight boxShadow">
        <div className="rightTitle">{title}</div>
        <div className="collects">
          {collectList?.map((item) => (
            <div className="collectItem" key={item.id}>
              <a href={`#/collection/${item.id}`} className="collectName">
                {item.name}
              </a>
              <div className="collectDesc">
                {`${dayjs(item.createTime).format('YYYY-MM-DD')} 更新 · ${item.count} 条内容`}
              </div>
            </div>
          ))}
        </div>
      </div>
      {dialogStateCode === 0 && (
        <CollectDialog
          submitFn={editSubmitFn}
          title="编辑收藏夹"
          backContent={backContent}
          collect={{
            value: collectInfo.name,
            state: collectInfo.status,
          }}
          hidden={hidden}
        />
      )}
      {dialogStateCode === 1 && (
        <DelDialog backContent={backContent} submitFn={delSubmitFn} tips={tips} />
      )}
    </CollectDetailWrapper>
  )
})
