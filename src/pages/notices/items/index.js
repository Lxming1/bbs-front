import { memo, useEffect, useState } from 'react'
import { getNoticeList } from '../../../service/notices'
import NoticesCollectWrapper from './style'
import { Empty } from 'antd'
import dayjs from 'dayjs'
import { DeleteOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import RelationBtn from '@/components/relationBtn'

export default memo(({ type }) => {
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)
  const [noticeList, setNoticeList] = useState([])

  const replyBtn = (
    <>
      <div className="button">
        <MessageOutlined />
        回复
      </div>
      <div className="button">
        <LikeOutlined />
        点赞
      </div>
    </>
  )

  const actionMapping = {
    praise: {
      content: '赞了我的',
      btn: null,
    },
    follow: {
      content: '关注了我',
      btn: null,
    },
    reply: {
      content: '回复了我的',
      btn: replyBtn,
    },
  }

  const newRelation = (relation, uid) => {
    reqFn()
  }

  const userPage = (id) => {
    window.location.href = `#/people/${id}`
  }

  const action = actionMapping[type].content

  const reqFn = async () => {
    const result = await getNoticeList(type, pagenum, pagesize)
    setNoticeList(result.data)
    // 读消息
    console.log(result.data.map((item) => item.id))
  }

  useEffect(() => {
    reqFn()
    return () => {
      setNoticeList([])
    }
  }, [type])

  return (
    <NoticesCollectWrapper>
      {noticeList.length ? (
        noticeList.map((item) => (
          <div key={item.id} className="noticeItem">
            <div className="left">
              <div className="leftAvatar" onClick={() => userPage(item?.author?.id)}>
                <img src={item?.author?.avatarUrl} alt="" />
              </div>
              <div className="leftDesc">
                <div className="nameHeader">
                  <div className="name" onClick={() => userPage(item?.author?.id)}>
                    {item?.author?.name}
                  </div>
                  <div className="action">
                    {action}
                    {item?.moment !== null && (item?.comment !== null ? '评论' : '动态')}
                  </div>
                </div>
                {item?.content && <div className="content text-nowrap">{item?.content}</div>}
                <div className="bottom">
                  <div className="time">
                    {dayjs(new Date(item.createTime).getTime()).format('YYYY年MM月DD日 HH:mm')}
                  </div>
                  {actionMapping[type].btn}
                  <div className="button hidden">
                    <DeleteOutlined />
                    删除该通知
                  </div>
                </div>
              </div>
            </div>
            {type !== 'follow' ? (
              <div className="right">
                {item?.moment?.images?.length ? (
                  <img src={`${item?.moment?.images?.[0]}?type=small`} alt="" />
                ) : (
                  item?.content ?? item?.moment?.title
                )}
              </div>
            ) : (
              <div className="followBtn">
                <RelationBtn
                  relation={item?.author?.relation}
                  peopleInfo={item?.author}
                  newRelation={newRelation}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="empty" style={{ top: '50%' }}>
          <Empty description="暂无消息" />
        </div>
      )}
    </NoticesCollectWrapper>
  )
})
