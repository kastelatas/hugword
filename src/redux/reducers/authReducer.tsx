import types from '@src/redux/types'

const initialState = {
  app: 'init',
  isAuth: false,
  user: null,
  loading: false,
  errorMessage: [],
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.auth.AUTH:
      return {...state, isAuth: true}

    case types.auth.LOGIN_REQUEST:
      return {...state, loading: true}
    case types.auth.LOGIN_SUCCESS:
      return {...state, user: action.payload.data?.user, errorMessage: [], loading: false}
    case types.auth.LOGIN_FAIL:
      return {...state, loading: false, errorMessage: action.payload}

    case types.user.UPDATE_USER_REQUEST:
      return {...state, loading: true}
    case types.user.UPDATE_USER_SUCCESS:
      return {...state, user: action.payload?.data, loading: false}
    case types.user.UPDATE_USER_FAIL:
      return {...state, loading: false}

    case types.user.IMG_UPLOAD_REQUEST:
      return {...state, dataLoading: true}
    case types.user.IMG_UPLOAD_SUCCESS:
      return {...state, user: action.payload?.data, loading: false}
    case types.user.IMG_UPLOAD_FAIL:
      return {...state, loading: false}

    case types.profile.GET_PROFILE_REQUEST:
      return {...state, dataLoading: true}
    case types.profile.GET_PROFILE_SUCCESS:
      return {...state, user: action.payload?.data, dataLoading: false}
    case types.profile.GET_PROFILE_FAIL:
      return {...state, dataLoading: false}

    case types.auth.LOGIN_USER_INIT_REQUEST:
      return {...state, loading: true}
    case types.auth.LOGIN_USER_INIT_SUCCESS:
      return {...state, user: action.payload.data.user, loading: false}
    case types.auth.LOGIN_USER_INIT_FAIL:
      return {...state, loading: false, errorMessage: action.payload}

    case types.auth.SET_EMAIL_REQUEST:
      return {...state, loading: true}
    case types.auth.SET_EMAIL_SUCCESS:
      return {...state, user: action.payload.data.user, loading: false, errorMessage: false}
    case types.auth.SET_EMAIL_FAIL:
      return {...state, loading: false, errorMessage: action.payload}

    case types.auth.SIGN_UP_USER_REQUEST:
      return {...state, loading: true}
    case types.auth.SIGN_UP_USER_SUCCESS:
      return {...state, user: action.payload.data, loading: false}
    case types.auth.SIGN_UP_USER_FAIL:
      return {...state, loading: false, errorMessage: action.payload}

    case 'UPDATE_TOPICS_LIST':
      return {
        ...state,
        user: {
          ...state.user,
          profile: {...state.user.profile, topics: state.user.profile.topics.filter((i) => i.id !== action.payload)},
        },
      }

    case types.auth.LOGOUT:
      return initialState

    case 'CLEAR_FORM_DATA':
      return {...state, errorMessage: []}

    default:
      return {...state}
  }
}
export default authReducer
