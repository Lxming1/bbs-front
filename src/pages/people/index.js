import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '../../hooks'
import PeopleWrapper from './style'
import { ManOutlined, WomanOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { getUserDetail } from '../../service/users'
import { getAagByTime } from '../../utils'

const People = memo(() => {
  const { user } = useStoreInfo('user')
  const { uid } = useParams()
  const [isProfile, setIsProfile] = useState(false)
  const [peopleInfo, setPeopleInfo] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [age, setAge] = useState(0)

  useEffect(() => {
    if (parseInt(uid) == user?.id) {
      setIsProfile(true)
      setPeopleInfo(user)
      setAge(getAagByTime(user?.birthday))
      return
    }
    getUserDetail(uid).then(({ data: userInfo }) => {
      setPeopleInfo(userInfo)
      setAge(getAagByTime(userInfo?.birthday))
    })
  }, [user])

  return (
    <PeopleWrapper>
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
                {peopleInfo?.birthday !== null && (
                  <li>
                    <div className="leftKey">年龄</div>
                    <div className="rightValue">{age}</div>
                  </li>
                )}
                {peopleInfo?.introduction !== null && (
                  <li>
                    <div className="leftKey">个人简介</div>
                    <div className="rightValue">{peopleInfo?.introduction}</div>
                  </li>
                )}
                {peopleInfo?.address?.parent?.id !== null && (
                  <li>
                    <div className="leftKey">居住地</div>
                    <div className="rightValue">
                      <span style={{ marginRight: '10px' }}>
                        {peopleInfo?.address?.parent?.name}
                      </span>
                      <span>{peopleInfo?.address?.children?.name}</span>
                    </div>
                  </li>
                )}
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
          <div></div>
        )}
      </div>
      <div className="mainBox">
        <div className="leftContent boxShadow"></div>
        <div className="rightContent boxShadow"></div>
      </div>
    </PeopleWrapper>
  )
})

export default People
