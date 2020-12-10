import { AnyAction } from 'redux'
import types from '../types'

interface IAmbassador {
  app: string
  list: any
  loading: boolean
  ambassador: any
  filter: any
}

const initialState: IAmbassador = {
  app: 'init',
  list: [],
  ambassador: null,
  loading: false,
  filter: {
    profile: {
      gender: null,
      topics: null,
    },
    state: {
      online: false,
    },
  },
}

const ambassadorReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.ambassador.GET_AMBASSADORS_LIST_REQUEST:
      return { ...state, loading: true }
    case types.ambassador.GET_AMBASSADORS_LIST_SUCCESS:
      return { ...state, loading: false, list: action.payload.data || [] }
    case types.ambassador.GET_AMBASSADORS_LIST_FAIL:
      return { ...state, loading: false }

    case types.ambassador.GET_AMBASSADOR_BY_ID_REQUEST:
      return { ...state, loading: true }
    case types.ambassador.GET_AMBASSADOR_BY_ID_SUCCESS:
      return { ...state, loading: false, ambassador: action.payload.data }
    case types.ambassador.GET_AMBASSADOR_BY_ID_FAIL:
      return { ...state, loading: false }

    case types.ambassador.GET_AMBASSADOR_BY_NAME_REQUEST:
      return { ...state, loading: true }
    case types.ambassador.GET_AMBASSADORS_SUCCESS:
      return { ...state, loading: false, list: action.payload.data }
    case types.ambassador.GET_AMBASSADORS_FAIL:
      return { ...state, loading: false }

    case types.ambassador.SET_FILTER:
      return { ...state, filter: action.payload }

    case types.ambassador.CLEAR_FILTER:
      return {
        ...state,
        filter: {
          profile: {
            gender: null,
            topics: null,
          },
          state: {
            online: false,
          },
        },
      }

    case 'CLEAR_AMBASSADORS':
      return { ...state, loading: false, list: [], ambassador: null }

    default:
      return { ...state }
  }
}
export default ambassadorReducer
