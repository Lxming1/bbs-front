import { React } from 'react'
import Right from './right'
import Left from './left'
import HomeWrapper from './style'

export default () => {
  return (
    <HomeWrapper>
      <Left />
      <Right />
    </HomeWrapper>
  )
}
