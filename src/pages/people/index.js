import { memo, useEffect, useState } from 'react'
import PeopleWrapper from './style'
import Header from './header'
import Main from './main'
import { useParams } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { useDispatch } from 'react-redux'
import { getProfileUser, setPeopleIndex } from '../../store/actionCreater/peopleAction'
import BackTop from '@/components/backTop'
import { verifyLogin, xmMessage } from '../../utils'

const People = memo(() => {
  const { profileUser, peopleIndex } = useStoreInfo('profileUser', 'peopleIndex', 'isLogin')
  const { uid } = useParams()
  const dispatch = useDispatch()

  const reqFn = async () => {
    if (uid === 'undefined') {
      xmMessage(2, '请先登录')
      window.location.href = '#/login'
      return
    }
    dispatch(getProfileUser(uid))
  }

  useEffect(() => {
    reqFn()
    return () => dispatch(setPeopleIndex(0))
  }, [uid])
  return (
    <PeopleWrapper>
      <Header peopleInfo={profileUser} />
      <Main peopleInfo={profileUser} peopleIndex={peopleIndex} />
      <BackTop />
    </PeopleWrapper>
  )
})

export default People
