import { memo } from 'react'
import PeopleWrapper from './style'
import Header from './header'
import Main from './main'

const People = memo(() => {
  return (
    <PeopleWrapper>
      <Header />
      <Main />
    </PeopleWrapper>
  )
})

export default People
