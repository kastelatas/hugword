import axios from 'axios'
import types from '../types'

const AMBASSADOR_EXPAND =
  'profile.topics.topic,profile.rating,profile.photo.image,profile.secondaryTopics.topic,profile.avatar,profile.rankTitle,profile.rating,state,profile.videos.video'

export const getAmbassadoresList = () => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.ambassador.GET_AMBASSADORS_LIST_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/ambassador?expand=${AMBASSADOR_EXPAND}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    dispatch({
      type: types.ambassador.GET_AMBASSADORS_LIST_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: types.ambassador.GET_AMBASSADORS_LIST_FAIL,
    })
  }
}

// TODO Needs to rename it to getUserbyID and remove to user action and reducer

export const getAmbassadorById = (id: string | string[] | undefined, userType: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.ambassador.GET_AMBASSADOR_BY_ID_REQUEST })
  try {
    const res = await axios.get(
      `${
        process.env.API_URL
      }/${userType}/${id}?expand=profile.photos.image,profile.photo.image,state,profile.topics.topic,profile.secondaryTopics.topic,profile.rating,profile.avatar,profile.cover,${
        userType === 'ambassador' ? 'profile.videos.video' : ''
      },profile.comments.client.profile.avatar.image`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    )
    const data = await res.data
    data.success &&
      dispatch({
        type: types.ambassador.GET_AMBASSADOR_BY_ID_SUCCESS,
        payload: data,
      })
    !data.success &&
      dispatch({
        type: types.ambassador.GET_AMBASSADOR_BY_ID_FAIL,
        payload: data,
      })
  } catch (e) {
    console.error(e)
  }
}

export const searchAmbassadors = (filterData: any, sorting?: string) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.ambassador.GET_AMBASSADORS_REQUEST })
  try {
    const res = await axios.get(
      `${process.env.API_URL}/ambassador?params=${JSON.stringify(filterData)}&expand=${AMBASSADOR_EXPAND}&${sorting}`,
    )
    const data = await res.data
    dispatch({
      type: types.ambassador.GET_AMBASSADORS_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatch({
      type: types.ambassador.GET_AMBASSADORS_FAIL,
    })
  }
}

export const setFilter = (filterData: any) => ({
  type: types.ambassador.SET_FILTER,
  payload: filterData,
})

export const cleanFilter = () => ({
  type: types.ambassador.CLEAR_FILTER,
})
