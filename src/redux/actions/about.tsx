import types from '@src/redux/types'
import axios from 'axios'

export const getAbout = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.about.GET_ABOUT_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/about-us?expand=photo1,photo2,photos.image,employees.image`)
    const data = await res.data
    data.success && dispatch({ type: types.about.GET_ABOUT_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.about.GET_ABOUT_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}
