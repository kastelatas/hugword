import * as _ from 'lodash'
import types from '../types'

const initialState = {
  notification: null,
  notifications: null,
  notificationType: null,
  pushes: null,
}

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notifications.GET_SOCKET_NOTIFICATIONS:
      return {
        ...state,
        notifications: state.notifications ? [...state.notifications, action.payload] : [action.payload],
      }

    case types.notifications.REMOVE_SOCKET_NOTIFICATIONS:
      return { ...state, notifications: [..._.drop(state.notifications)], loading: true }

    case types.notifications.GET_SOCKET_PUSHES:
      return { ...state, pushes: action.payload.pushes, loading: true }

    case types.auth.LOGIN_USER_INIT_REQUEST:
      return { ...state, loading: true }
    case types.auth.LOGIN_USER_INIT_SUCCESS:
      return { ...state, notifications: action.payload.data.pushes, loading: false }
    case types.auth.LOGIN_USER_INIT_FAIL:
      return { ...state, loading: false, errorMessage: action.payload }

    default:
      return { ...state }
  }
}

export default notificationsReducer