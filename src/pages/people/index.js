import { memo, useEffect, useState } from 'react'
import PeopleWrapper from './style'
import Header from './header'
import Main from './main'
import { useParams } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { useDispatch } from 'react-redux'
import { getProfileUser } from '../../store/actionCreater/peopleAction'

const People = memo(() => {
  const { profileUser } = useStoreInfo('user', 'profileUser')
  const { uid } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileUser(uid))
  }, [uid])

  return (
    <PeopleWrapper>
      <Header peopleInfo={profileUser} />
      <Main peopleInfo={profileUser} />
    </PeopleWrapper>
  )
})

export default People
