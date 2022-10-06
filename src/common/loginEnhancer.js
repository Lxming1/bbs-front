import { shallowEqual, useSelector } from 'react-redux'
import Login from '../pages/login'

function withAuth(WrapperComponent) {
  const { user } = useSelector((state) => {
    user: state.user
  }, shallowEqual)

  return (props) => (user !== {} ? <WrapperComponent {...props} /> : <Login />)
}

export default withAuth
