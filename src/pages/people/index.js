import { memo, useEffect, useState } from 'react'
import { useStoreInfo } from '../../hooks'
import PeopleWrapper from './style'
import { ManOutlined, WomanOutlined, DownOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { getUserDetail } from '../../service/users'

const People = memo(() => {
  const { user } = useStoreInfo('user')
  const { uid } = useParams()
  const [isProfile, setIsProfile] = useState(false)
  const [peopleInfo, setPeopleInfo] = useState({})

  useEffect(() => {
    if (uid == user.id) {
      setIsProfile(true)
      setPeopleInfo(user)
      return
    }
    getUserDetail(uid).then(({ data: userInfo }) => {
      setPeopleInfo(userInfo)
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
          <div className="gender">
            {peopleInfo.gender === 0 ? <ManOutlined /> : <WomanOutlined />}
          </div>
          <div className="expand">
            <DownOutlined />
            查看详细资料
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
    </PeopleWrapper>
  )
})

export default People
