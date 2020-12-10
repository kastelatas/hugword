import types from '../types'

const initialState = {
  statistics: [],
  loading: false,
}

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.dashboard.GET_DASHBOARD_DATA_REQUEST:
      return { ...state, loading: true }
    case types.dashboard.GET_DASHBOARD_DATA_SUCCESS:
      return { ...state, statistics: action.payload.data, loading: false }
    case types.dashboard.GET_DASHBOARD_DATA_FAIL:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
export default dashboardReducer
