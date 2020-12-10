import types from '@src/redux/types'
import axios from 'axios'
import { userInit } from '@src/redux/actions/auth'
import { openModal, openLoadingModal, closeLoadingModal } from '@src/redux/actions/modals'
import { UserTypeToString } from '@src/ts/enum/user_enum'
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import { ModalsType } from '../../ts/enum/modal_enum'

const AMBASSADOR_EXPAND =
  '?expand=profile.photos.image,profile,profile.rating,profile.topics.topic,profile.comments.client,profile.videos.video,profile.secondaryTopics.topic,profile.avatar,profile.photo,profile.cover,profile.comments.client.profile.avatar.image,state'
const CLIENT_EXPAND =
  '?expand=profile.photos.image,setting,profile.topics.topic,profile.secondaryTopics.topic,profile.avatar,profile.photo,profile.cover,profile.rankTitle,profile.comments.client.profile.avatar.image'

export const imgUpload = (base64: any, userId: any, userType: any, imgType: any, imgs: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.IMG_UPLOAD_REQUEST })
  try {
    const res = await axios.post(`${process.env.API_URL}/image/upload`, JSON.stringify({ data: base64 }), {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    const imgData =
      imgType === 'photos'
        ? { [`${imgType}`]: [...imgs, { image_id: data.data.id }] }
        : { [`${imgType}`]: `${data.data.id}` }
    data.success && dispatch({ type: types.user.IMG_UPLOAD_SUCCESS, payload: data })
    data.success && dispatch(updateImg(userId, userType, imgData))
    !data.success && dispatch({ type: types.user.IMG_UPLOAD_FAIL })
  } catch (e) {
    console.error(e)
  }
}

export const updateImg = (userId: any, userType: string, imgData: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  await dispatch(editUser(userId, userType, imgData))
  await dispatch({ type: types.modals.CLOSE_MODAL })
  await clearData()
}

export const uploadVideo = (userId: any, videoData: any, videos: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.UPLOAD_USER_PROFILE_VIDEO_REQUEST })
  try {
    const bodyFormData = new FormData()
    bodyFormData.append('file', videoData)
    //   const res = await axios.post(`${process.env.API_URL}/${userType}/${userId}`, JSON.stringify({ profile: imgData }))
    const res = await axios({
      method: 'post',
      url: `${process.env.API_URL}/media/video-upload`,
      data: bodyFormData,
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.user.UPLOAD_USER_PROFILE_VIDEO_SUCCESS, payload: data })
    data.success &&
      dispatch(
        updateVideoFile(userId, 'ambassador', {
          videos: [...videos, { video_id: data.data?.id }],
        }),
      )
    !data.success && dispatch({ type: types.user.UPLOAD_USER_PROFILE_VIDEO_FAIL })
  } catch (e) {
    throw new Error(`Could not fetch ${process.env.API_URL}, received ${e.status}`)
  }
}

export const updateVideo = (userId: any, videoData: any, videos: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_REQUEST })
  try {
    // let bodyFormData = new FormData();
    // bodyFormData.append('file', videoData);
    // const res = await axios.patch(`${process.env.API_URL}/media/video-upload/${userId}`, JSON.stringify({ profile: videoData }), {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` }})
    const res = await axios.post(
      `${process.env.API_URL}/media/video-upload/${userId}`,
      JSON.stringify({ profile: videoData }),
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    )

    // const res = await axios({Bearer ${localStorage.getItem
    //   method: 'post',
    //   url:`${process.env.API_URL}/media/video-upload/${userId}`,
    //   data: bodyFormData,
    //   headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    // })
    const data = await res.data
    data.success && dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_SUCCESS, payload: data })

    data.success && dispatch({ type: types.modals.CLOSE_MODAL })
    // data.success && dispatch(clearData())
    !data.success && dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_FAIL })
    // dispatch(userInit())
  } catch (e) {
    console.error(e)
  }
}

export const updateVideoFile = (userId: any, userType: string, imgData: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_REQUEST })
  await dispatch(editUser(userId, userType, imgData))
  await dispatch({ type: types.modals.CLOSE_MODAL })
  await clearData()
}

export const getSimilarUsers = (userId: any, userType: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.GET_SIMILAR_USERS_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/ambassador/${userId}/similar?expand=profile.avatar,state`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.user.GET_SIMILAR_USERS_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.user.GET_SIMILAR_USERS_FAIL })
  } catch (e) {
    console.error(e)
  }
}

export const clearData = () => {
  return { type: types.user.CLEAR_DATA }
}

export const editUser = (userId: any, userType: any, editData: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  const expandData = userType === 'client' ? CLIENT_EXPAND : AMBASSADOR_EXPAND
  dispatch({ type: types.user.UPDATE_USER_REQUEST })
  try {
    const res = await axios.patch(
      `${process.env.API_URL}/${userType}/${userId}${expandData}`,
      JSON.stringify({ profile: editData }),
      { headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` } },
    )
    const data = await res.data
    data.success && dispatch({ type: types.user.UPDATE_USER_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.user.UPDATE_USER_FAIL })
  } catch (e) {
    throw new Error(`Could not fetch ${process.env.API_URL}, received ${e.status}`)
  }
}

//TODO merge this action with requst to editUser
export const editUserNotification = (userId: any, userType: any, editData: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  const expandData = userType === 'client' ? CLIENT_EXPAND : AMBASSADOR_EXPAND
  dispatch({ type: types.user.UPDATE_USE_NOTIFICATION_REQUEST })
  try {
    const res = await axios.patch(
      `${process.env.API_URL}/${userType}/${userId}${expandData}`,
      JSON.stringify({ setting: editData }),
      { headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` } },
    )
    const data = await res.data
    data.success && dispatch({ type: types.user.UPDATE_USER_NOTIFICATION_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.user.UPDATE_USER_NOTIFICATION_FAIL })
  } catch (e) {
    throw new Error(`Could not fetch ${process.env.API_URL}, received ${e.status}`)
  }
}

export const editUserEmail = (userEmail: any) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.user.UPDATE_USER_EMAIL_REQUEST })
  dispatch(openLoadingModal())
  try {
    const res = await axios.post(`${process.env.API_URL}/user/set-email`, JSON.stringify({ email: userEmail }), {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.user.UPDATE_USER_EMAIL_SUCCESS, payload: data })
    dispatch(closeLoadingModal())
    data.success && dispatch(openModal({ modalType: ModalsType.MAIL_SENDING }))
    !data.success && dispatch({ type: types.user.UPDATE_USER_EMAIL_FAIL })
  } catch (e) {
    throw new Error(`Could not fetch ${process.env.API_URL}, received ${e.status}`)
    dispatch(closeLoadingModal())
  }
}

export const settUserPassword = (oldpassword: any, newpassword: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.UPDATE_USER_PASSWORD_REQUEST })
  dispatch(openLoadingModal())
  try {
    const res = await axios.post(
      `${process.env.API_URL}/user/set-password`,
      JSON.stringify({ old_password: oldpassword, new_password: newpassword }),
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    )
    const data = await res.data
    dispatch(closeLoadingModal())
    data.success && dispatch({ type: types.user.UPDATE_USER_PASSWORD_SUCCESS, payload: data })
    data.success && dispatch(openModal({ modalType: ModalsType.MAIL_SENDING }))
    !data.success && dispatch({ type: types.user.UPDATE_USER_PASSWORD_FAIL, payload: data })
  } catch (e) {
    console.error(e)
    dispatch(closeLoadingModal())
  }
}


export const addTopic = (userType: string, userId: number, topicsData: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  await dispatch(editUser(userId, userType, topicsData))
  await dispatch({ type: types.modals.CLOSE_MODAL })
}

export const getTopicsList = (sorting) => async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
  dispatch({ type: types.user.GET_ALL_TOPICS_REQUEST })
  const url = `${process.env.API_URL}/topic?expand=video,ambassadorsCount`
  const urlSorting = `${process.env.API_URL}/topic?expand=ambassadorsCount,video&${sorting}`
  try {
    const res = await axios.get(sorting ? urlSorting : url)
    const data = await res.data
    data.success && dispatch({ type: types.user.GET_ALL_TOPICS_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.user.GET_ALL_TOPICS_FAIL })
    // dispatch(userInit())
  } catch (e) {
    console.error(e)
  }
}

export const getReviews = (ambasadorId: number) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.GET_REVIEWS_REQUEST })
  try {
    const res = await axios.get(
      `${process.env.API_URL}/ambassador-profile-comment?params={"ambassador_profile_id":"${ambasadorId}"}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    )
    const data = await res.data
    data.success && dispatch({ type: types.user.GET_REVIEWS_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.user.GET_REVIEWS_FAIL })
  } catch (e) {
    console.error(e)
  }
}

export const leaveReviews = (ambassador: any, commentsData: any, rating: any) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.user.ADD_REVIEWS_REQUEST })
  try {
    const res = await axios.post(
      `${process.env.API_URL}/ambassador-profile-comment`,
      JSON.stringify({ ambassador_profile_id: ambassador.profile?.id, message: commentsData, rating }),
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    )
    const data = await res.data
    data.success && dispatch({ type: types.user.ADD_REVIEWS_SUCCESS, payload: data })
    // data.success && dispatch(getReviews())
    data.success && dispatch({ type: types.modals.CLOSE_MODAL })
    !data.success && dispatch({ type: types.user.ADD_REVIEWS_FAIL })
    dispatch(getAmbassadorById(ambassador?.id, 'ambassador'))
  } catch (e) {
    console.error(e)
  }
}
