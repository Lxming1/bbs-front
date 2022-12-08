import { ManOutlined, WomanOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { memo, useEffect, useState } from 'react'
import HeaderWrapper from './style'
import { getAagByTime } from '@/utils'
import { getRelationship } from '@/service/users'
import { useStoreInfo } from '@/hooks'
import { Image } from 'antd'
import RelationBtn from '@/components/relationBtn'
import { useDispatch } from 'react-redux'
import { getProfileUser } from '@/store/actionCreater/peopleAction'

export default memo(({ peopleInfo }) => {
  const { isProfile } = useStoreInfo('isProfile')
  const { isLogin } = useStoreInfo('isLogin')
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)
  const [relation, setRelation] = useState({
    care: false,
    fan: false,
  })
  const [age, setAge] = useState(0)
  const changeRelation = (newRelation) => {
    setRelation(newRelation)
    dispatch(getProfileUser(peopleInfo.id))
  }

  const reqFn = async () => {
    if (!peopleInfo?.id) return
    if (isProfile) {
      setAge(getAagByTime(peopleInfo?.birthday))
      return
    }
    if (isLogin) {
      const { data: relation } = await getRelationship(peopleInfo?.id)
      setRelation(relation)
    }
  }

  useEffect(() => {
    reqFn()
  }, [isProfile, peopleInfo])

  return (
    <HeaderWrapper>
      <div className="header boxShadow">
        <div className="avatar">
          <Image src={peopleInfo?.avatar_url} alt="" />
        </div>
        <div className="info">
          <h1 className="name">{peopleInfo?.name}</h1>
          <div className="detailInfo">
            {!showDetail ? (
              <div className="gender">
                {peopleInfo?.gender === 0 ? <ManOutlined /> : <WomanOutlined />}
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
        ) : (
          <div className="otherRightBtn">
            <RelationBtn relation={relation} newRelation={changeRelation} peopleInfo={peopleInfo} />
          </div>
        )}
      </div>
    </HeaderWrapper>
  )
})
