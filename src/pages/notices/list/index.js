import { memo, useCallback, useEffect, useState } from 'react'
import { delNotice, getNoticeList, readNotices } from '@/service/notices'
import NoticesCollectWrapper from './style'
import { Empty, Input, Pagination } from 'antd'
import dayjs from 'dayjs'
import { DeleteOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import RelationBtn from '@/components/relationBtn'
import { useStoreInfo } from '@/hooks'
import { useDispatch } from 'react-redux'
import { handleUserMes, setUserMes } from '@/store/actionCreater/authActions'
import { getUserDetail } from '@/service/users'
import { xmMessage } from '@/utils'
import NoticeItem from './item'

export default memo(({ type }) => {
  const { user } = useStoreInfo('user')
  const pagesize = 10
  const [pagenum, setPagenum] = useState(1)
  let [noticeList, setNoticeList] = useState([])
  const [total, setTotal] = useState(0)
  const dispatch = useDispatch()

  setNoticeList = useCallback(setNoticeList, [])

  const reqFn = async (pagenum) => {
    const {
      data: { noticeList, total },
    } = await getNoticeList(type, pagenum, pagesize)
    setNoticeList(noticeList)
    setTotal(total)
    // 读消息
    const ids = noticeList.filter((item) => item.status === 0).map((item) => item.id)
    await readNotices(ids)
    setNoticeList((noticeList) =>
      noticeList.map((item) => {
        if (ids.includes(item.id)) {
          item.status = 1
        }
        return item
      })
    )
    const { data: userInfo } = await getUserDetail(user.id)
    dispatch(handleUserMes(userInfo))
  }
  const changePage = (page) => {
    setPagenum(page)
    reqFn(page)
  }

  useEffect(() => {
    reqFn(1)
    return () => {
      setNoticeList([])
    }
  }, [type])

  return (
    <NoticesCollectWrapper>
      {noticeList.length ? (
        noticeList.map((item) => (
          <NoticeItem
            notice={item}
            key={item.id}
            type={type}
            reqFn={() => reqFn(pagenum)}
            setNoticeList={setNoticeList}
          />
        ))
      ) : (
        <div className="empty" style={{ top: '50%' }}>
          <Empty description="暂无消息" />
        </div>
      )}
      <Pagination
        hideOnSinglePage
        className="pagination"
        total={total}
        showSizeChanger={false}
        showTotal={(total) => `Total ${total} items`}
        current={pagenum}
        onChange={changePage}
      />
    </NoticesCollectWrapper>
  )
})
