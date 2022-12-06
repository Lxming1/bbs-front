import { getUserDetail } from '../../service/users'
import { SET_IS_PROFILE, SET_PROFILE_USER } from '../constant'

export const setProfileUser = (profileUser) => ({
  type: SET_PROFILE_USER,
  profileUser,
})

export const getProfileUser = (uid) => {
  return async (dispatch, getState) => {
    const state = getState()
    const user = state.get('user')
    const isLogin = state.get('isLogin')
    if (!isLogin || user?.id !== parseInt(uid)) {
      const { data: newUser } = await getUserDetail(uid)
      dispatch(setIsProfile(false))
      dispatch(setProfileUser(newUser))
      return
    }
    dispatch(setIsProfile(true))
    dispatch(setProfileUser(user))
  }
}

export const setIsProfile = (isProfile) => ({
  type: SET_IS_PROFILE,
  isProfile,
})
