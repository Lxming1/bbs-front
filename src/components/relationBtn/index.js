import { memo } from 'react'
import { cancelCare, care } from '@/service/users'
import { PlusOutlined, SwapOutlined, CheckOutlined } from '@ant-design/icons'
import { debounce, verifyLogin, xmMessage } from '../../utils'
import { useStoreInfo } from '@/hooks'

export default memo(({ relation, peopleInfo, newRelation }) => {
  const { isLogin, user } = useStoreInfo('isLogin', 'user')

  const careU = async () => {
    await verifyLogin(isLogin)
    if (peopleInfo.id === user.id) return xmMessage(1, '您不能关注您自己')
    const result = await care(peopleInfo?.id)
    newRelation(result.data, peopleInfo?.id)
  }

  const cancelCareU = async () => {
    await verifyLogin(isLogin)
    const result = await cancelCare(peopleInfo?.id)
    newRelation(result.data, peopleInfo?.id)
  }

  return relation?.care && relation?.fan ? (
    <button className="sendBtn careBtn" onClick={debounce(cancelCareU, 300, true)}>
      <SwapOutlined />
      互相关注
    </button>
  ) : relation?.care ? (
    <button className="sendBtn careBtn" onClick={debounce(cancelCareU, 300, true)}>
      <CheckOutlined />
      已关注
    </button>
  ) : (
    <button className="sendBtn" onClick={debounce(careU, 300, true)}>
      <PlusOutlined />
      关注{!peopleInfo?.gender ? '他' : '她'}
    </button>
  )
})
