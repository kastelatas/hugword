import types from '@src/redux/types'
import axios from 'axios'

export const getDashboardChart = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.charts.GET_AMBASSADOR_DASHBOARD_CHART_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/ambassador/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.about.GET_ABOUT_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.about.GET_ABOUT_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}