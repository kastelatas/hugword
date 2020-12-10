import types from '@src/redux/types'
import axios from 'axios'

export const getFaqsQuestions = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.faq.GET_FAQ_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/faq`)
    const data = await res.data
    data.success && dispatch({ type: types.faq.GET_FAQ_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.faq.GET_FAQ_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}

