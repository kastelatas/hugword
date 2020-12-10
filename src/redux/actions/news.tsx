import types from '@src/redux/types'
import axios from 'axios'

export const getNews = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.news.GET_NEWS_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/news?expand=preview`)
    const data = await res.data
    data.success && dispatch({ type: types.news.GET_NEWS_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.news.GET_NEWS_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}

export const getNewsById = (id: number) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.news.GET_NEWS_BY_ID_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/news/${id}?expand=photo`)
    const data = await res.data
    data.success && dispatch({ type: types.news.GET_NEWS_BY_ID_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.news.GET_NEWS_BY_ID_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}
