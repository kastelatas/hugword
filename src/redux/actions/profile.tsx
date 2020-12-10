import types from '@src/redux/types'
import axios from 'axios'
import { clearData } from '@src/redux/actions/user'

const AMBASSADOR_EXPAND =
  '?expand=profile.photos.image,setting,profile.topics.topic,profile.rating,profile.comments.client,profile.videos.video,profile.secondaryTopics.topic,profile.avatar,profile.photo,profile.cover,profile.rankTitle,profile.comments.client.profile.avatar.image'
const CLIENT_EXPAND =
  '?expand=profile.photos.image,setting,profile.topics.topic,profile.secondaryTopics.topic,profile.avatar,profile.photo,profile.cover,profile.rankTitle,profile.comments.client.profile.avatar.image'

export const getProfile = (userId: any, userType: string) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.profile.GET_PROFILE_REQUEST })
  const expandData = userType === 'client' ? CLIENT_EXPAND : AMBASSADOR_EXPAND
  try {
    const res = await axios.get(`${process.env.API_URL}/${userType}/${userId}${expandData}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.profile.GET_PROFILE_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.profile.GET_PROFILE_FAIL })
  } catch (e) {
    throw new Error(`Could not fetch ${process.env.API_URL}, received ${e.status}`)
  }
}
