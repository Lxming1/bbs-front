import { useSelector } from 'react-redux'

export const useStoreInfo = (prop) => {
  const state = useSelector((state) => ({
    [prop]: state.get(prop),
  }))

  return state[prop]
}
