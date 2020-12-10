import types from '../types'

const initialState = {
  contacts: [],
  topics: [],
  reviews: [],
  similarUsers: [],
  data: {},
  VideoData: {},
  loading: false,
  dataLoading: false,
  videoDataLoading: false,
  passwordChangeErrors: [],
  updateLoading: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.user.IMG_UPLOAD_REQUEST:
      return { ...state, dataLoading: true }
    case types.user.IMG_UPLOAD_SUCCESS:
      return { ...state, data: action.payload?.data, dataLoading: false }
    case types.user.IMG_UPLOAD_FAIL:
      return { ...state, dataLoading: false }

    case types.user.VIDEO_UPLOAD_REQUEST:
      return { ...state, videoDataLoading: true }
    case types.user.VIDEO_UPLOAD_SUCCESS:
      return { ...state, VideoData: action.payload?.data, videoDataLoading: false }
    case types.user.VIDEO_UPLOAD_FAIL:
      return { ...state, videoDataLoading: false }

    case types.user.UPLOAD_USER_PROFILE_VIDEO_REQUEST:
      return { ...state, videoDataLoading: true }
    case types.user.UPLOAD_USER_PROFILE_VIDEO_SUCCESS:
      return { ...state, VideoData: action.payload?.data, videoDataLoading: false }
    case types.user.UPLOAD_USER_PROFILE_VIDEO_FAIL:
      return { ...state, videoDataLoading: false }

    case types.user.UPDATE_USER_PROFILE_VIDEO_REQUEST:
      return { ...state, dataLoading: true }
    case types.user.UPDATE_USER_PROFILE_VIDEO_SUCCESS:
      return { ...state, data: action.payload?.data, dataLoading: false }
    case types.user.UPDATE_USER_PROFILE_VIDEO_FAIL:
      return { ...state, dataLoading: false }

    case types.user.CLEAR_DATA:
      return { ...state, data: {}, loading: false }

    case types.user.GET_SIMILAR_USERS_REQUEST:
      return { ...state, loading: true }
    case types.user.GET_SIMILAR_USERS_SUCCESS:
      return { ...state, similarUsers: action.payload?.data, loading: false }
    case types.user.GET_SIMILAR_USERS_FAIL:
      return { ...state, loading: false }

    case types.user.UPDATE_USER_PASSWORD_REQUEST:
      return { ...state, loading: true, updateLoading: true }
    case types.user.UPDATE_USER_PASSWORD_SUCCESS:
      return { ...state, passwordChangeErrors: [], loading: false, updateLoading: false }
    case types.user.UPDATE_USER_PASSWORD_FAIL:
      return { ...state, passwordChangeErrors: action.payload.errors, loading: false, updateLoading: false }

    case types.user.GET_ALL_TOPICS_REQUEST:
      return { ...state, loading: true }
    case types.user.GET_ALL_TOPICS_SUCCESS:
      return { ...state, topics: action.payload?.data, loading: false }
    case types.user.GET_ALL_TOPICS_FAIL:
      return { ...state, loading: false }

    case types.user.GET_REVIEWS_REQUEST:
      return { ...state, loading: true }
    case types.user.GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload?.data, loading: false }
    case types.user.GET_REVIEWS_FAIL:
      return { ...state, loading: false }

    case types.user.ADD_REVIEWS_REQUEST:
      return { ...state, loading: true }
    case types.user.ADD_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload?.data, loading: false }
    case types.user.ADD_REVIEWS_FAIL:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
export default userReducer
