import { memo } from 'react'
import { useStoreInfo } from '../../hooks'
import ProfileWrapper from './style'
const Profile = memo(() => {
  const { user } = useStoreInfo('user')
  return (
    <ProfileWrapper>
      <div className="header">
        <div className="avatar">
          <img src={user.avatar_url} alt="" />
        </div>
      </div>
    </ProfileWrapper>
  )
})

export default Profile
