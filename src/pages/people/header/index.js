import {
  ManOutlined,
  WomanOutlined,
  DownOutlined,
  UpOutlined,
  PlusOutlined,
  SwapOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '@/hooks'
import HeaderWrapper from './styled'
import { useParams } from 'react-router-dom'
import { getUserDetail } from '@/service/users'
import { getAagByTime, debounce } from '@/utils'
import { cancelCare, care, getRelationship } from '@/service/users'

export default memo(() => {
  const { user } = useStoreInfo('user')
  const { uid } = useParams()
  const [isProfile, setIsProfile] = useState(false)
  const [peopleInfo, setPeopleInfo] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [relation, setRelation] = useState({
    care: false,
    fan: false,
  })
  const [age, setAge] = useState(0)

  const careU = async () => {
    const result = await care(peopleInfo.id)
    setRelation(result.data)
  }

  const cancelCareU = async () => {
    const result = await cancelCare(peopleInfo.id)
    setRelation(result.data)
  }

  useEffect(() => {
    if (user.id === undefined) return
    if (parseInt(uid) === user.id) {
      setIsProfile(true)
      setPeopleInfo(user)
      setAge(getAagByTime(user?.birthday))
      return
    }
    getUserDetail(uid).then(({ data: userInfo }) => {
      setIsProfile(false)
      getRelationship(userInfo.id).then((res) => {
        setRelation(res.data)
      })
      setPeopleInfo(userInfo)
      setAge(getAagByTime(userInfo?.birthday))
    })
  }, [user, uid])
  return (
    <HeaderWrapper>
      <div className="header boxShadow">
        <div className="avatar">
          <img src={peopleInfo.avatar_url} alt="" />
        </div>
        <div className="info">
          <h1 className="name">{peopleInfo.name}</h1>
          <div className="detailInfo">
            {!showDetail ? (
              <div className="gender">
                {peopleInfo.gender === 0 ? <ManOutlined /> : <WomanOutlined />}
              </div>
            ) : (
              <ul>
                <li>
                  <div className="leftKey">年龄</div>
                  {peopleInfo?.birthday !== null && <div className="rightValue">{age}</div>}
                </li>
                <li>
                  <div className="leftKey">个人简介</div>
                  {peopleInfo?.introduction !== null && (
                    <div className="rightValue">{peopleInfo?.introduction}</div>
                  )}
                </li>
                <li>
                  <div className="leftKey">居住地</div>
                  {peopleInfo?.address?.parent?.id !== null && (
                    <div className="rightValue">
                      <span style={{ marginRight: '10px' }}>
                        {peopleInfo?.address?.parent?.name}
                      </span>
                      <span>{peopleInfo?.address?.children?.name}</span>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
          <div className="expand" onClick={() => setShowDetail((_) => !_)}>
            {!showDetail ? (
              <>
                <DownOutlined />
                查看详细资料
              </>
            ) : (
              <>
                <UpOutlined />
                收起详细资料
              </>
            )}
          </div>
        </div>
        {isProfile ? (
          <a href="#/profile/edit" className="Button rightBtn">
            编辑个人资料
          </a>
        ) : relation?.care && relation?.fan ? (
          <div className="sendBtn otherRightBtn careBtn" onClick={debounce(cancelCareU, 300, true)}>
            <SwapOutlined />
            互相关注
          </div>
        ) : relation?.care ? (
          <div className="sendBtn otherRightBtn careBtn" onClick={debounce(cancelCareU, 300, true)}>
            <CheckOutlined />
            已关注
          </div>
        ) : (
          <div className="sendBtn otherRightBtn" onClick={debounce(careU, 300, true)}>
            <PlusOutlined />
            关注{!peopleInfo.gender ? '他' : '她'}
          </div>
        )}
      </div>
    </HeaderWrapper>
  )
})
