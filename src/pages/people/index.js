import { memo, useEffect, useState } from 'react'
import PeopleWrapper from './style'
import Header from './header'
import Main from './main'
import { useParams } from 'react-router-dom'
import { useStoreInfo } from '@/hooks'
import { useDispatch } from 'react-redux'
import { getProfileUser, setPeopleIndex } from '../../store/actionCreater/peopleAction'

const People = memo(() => {
  const { profileUser, peopleIndex } = useStoreInfo('user', 'profileUser', 'peopleIndex')
  const { uid } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileUser(uid))
    dispatch(setPeopleIndex(0))
  }, [uid])
  return (
    <PeopleWrapper>
      <Header peopleInfo={profileUser} />
      <Main peopleInfo={profileUser} peopleIndex={peopleIndex} />
    </PeopleWrapper>
  )
})

export default People
