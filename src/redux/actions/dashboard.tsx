import types from '@src/redux/types'
import axios from 'axios'

export const getDashboardData = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.dashboard.GET_DASHBOARD_DATA_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/ambassador/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.dashboard.GET_DASHBOARD_DATA_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.dashboard.GET_DASHBOARD_DATA_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}