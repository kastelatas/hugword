import types from '../types'

const initialState = {
  aboutData: [],
  currNews: null,
}

const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.about.GET_ABOUT_REQUEST:
      return { ...state, loading: true }
    case types.about.GET_ABOUT_SUCCESS:
      return { ...state, aboutData: action.payload.data, loading: false }
    case types.about.GET_ABOUT_FAIL:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
export default aboutReducer
