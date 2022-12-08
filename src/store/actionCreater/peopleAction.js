import { getUserDetail } from '../../service/users'
import { SET_IS_PROFILE, SET_PEOPLE_INDEX, SET_PROFILE_USER } from '../constant'
import { setUserMes } from './authActions'

export const setProfileUser = (profileUser) => ({
  type: SET_PROFILE_USER,
  profileUser,
})

export const setPeopleIndex = (peopleIndex) => ({
  type: SET_PEOPLE_INDEX,
  peopleIndex,
})

export const getProfileUser = (uid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const user = state.get('user')
    const isLogin = state.get('isLogin')
    const { data: newUser } = await getUserDetail(uid)
    dispatch(setProfileUser(newUser))

    if (!isLogin || user?.id !== parseInt(uid)) {
      dispatch(setIsProfile(false))
    } else {
      dispatch(setIsProfile(true))
      dispatch(setUserMes(newUser))
    }
  }
}

export const setIsProfile = (isProfile) => ({
  type: SET_IS_PROFILE,
  isProfile,
})
