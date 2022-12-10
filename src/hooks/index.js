import { shallowEqual, useSelector } from 'react-redux'
export const useStoreInfo = (...props) => {
  const state = useSelector(
    (state) =>
      props.reduce((pre, value) => {
        pre[value] = state.get(value)
        return pre
      }, {}),
    shallowEqual
  )

  return state
}
