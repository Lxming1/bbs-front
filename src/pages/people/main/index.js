import { memo } from 'react'
import MainWrapper from './style'
import PeopleLeftContent from './left'
import PeopleRightContent from './right'

const People = memo(({ peopleInfo, peopleIndex }) => {
  return (
    <MainWrapper>
      <div className="leftContent boxShadow">
        <PeopleLeftContent peopleInfo={peopleInfo} peopleIndex={peopleIndex} />
      </div>
      <div className="rightContent">
        <PeopleRightContent peopleInfo={peopleInfo} />
      </div>
    </MainWrapper>
  )
})

export default People
