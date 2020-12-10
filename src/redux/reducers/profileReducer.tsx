import types from '../types'

const initialState = {
  userProfile: null,
  loading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.profile.GET_PROFILE_REQUEST:
      return { ...state, dataLoading: true }
    case types.profile.GET_PROFILE_SUCCESS:
      return { ...state, userProfile: action.payload?.data, dataLoading: false }
    case types.profile.GET_PROFILE_FAIL:
      return { ...state, dataLoading: false }

    default:
      return { ...state }
  }
}
export default userReducer
