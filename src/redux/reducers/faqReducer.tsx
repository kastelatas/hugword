import types from '../types'

const initialState = {
  faqList: [],
}

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.faq.GET_FAQ_REQUEST:
      return { ...state, loading: true }
    case types.faq.GET_FAQ_SUCCESS:
      return { ...state, faqList: action.payload.data, loading: false }
    case types.faq.GET_FAQ_FAIL:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
export default faqReducer
