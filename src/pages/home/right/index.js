import { memo } from 'react'
import RightWrapper from './style'
import { useStoreInfo } from '@/hooks'
import { verifyLogin } from '../../../utils'

const Right = memo(() => {
  const { isLogin } = useStoreInfo('isLogin')

  const createMoment = async () => {
    await verifyLogin(isLogin)
    window.location.href = '#/moment/new'
  }

  return (
    <RightWrapper>
      <div className="sendBtn" onClick={createMoment}>
        发表动态
      </div>
    </RightWrapper>
  )
})

export default Right
