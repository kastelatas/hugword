import types from '../types'

const initialState = {
  newsList: [],
  currNews: null,
}

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.news.GET_NEWS_REQUEST:
      return { ...state, loading: true }
    case types.news.GET_NEWS_SUCCESS:
      return { ...state, newsList: action.payload.data, loading: false }
    case types.news.GET_NEWS_FAIL:
      return { ...state, loading: false }

    case types.news.GET_NEWS_BY_ID_REQUEST:
      return { ...state, loading: true }
    case types.news.GET_NEWS_BY_ID_SUCCESS:
      return { ...state, currNews: action.payload.data, loading: false }
    case types.news.GET_NEWS_BY_ID_FAIL:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
export default newsReducer
