import types from '../types'

const initialState = {
  dashboardChartData: [],
  loading: false,
}

const chartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.charts.GET_AMBASSADOR_DASHBOARD_CHART_REQUEST:
      return { ...state, loading: true }
    case types.charts.GET_AMBASSADOR_DASHBOARD_CHART_ABOUT_SUCCESS:
      return { ...state, dashboardChartData: action.payload.data, loading: false }
    case types.charts.GET_AMBASSADOR_DASHBOARD_CHART_ABOUT_FAIL:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
export default chartsReducer
