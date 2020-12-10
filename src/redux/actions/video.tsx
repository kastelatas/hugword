import { userInit } from '@src/redux/actions/auth'
import types from '@src/redux/types'
import axios from 'axios'


export const clearData = () => {
    return { type: types.user.CLEAR_DATA }
  }

export const uploadVideo = ( videoData: any) => async (
    dispatch: (arg0: { type: string; payload?: any }) => void,
  ) => {
    dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_REQUEST })
    try {
        let bodyFormData = new FormData();
        bodyFormData.append('file', videoData); 
    //   const res = await axios.post(`${process.env.API_URL}/${userType}/${userId}`, JSON.stringify({ profile: imgData }))
      const res = await axios({
                        method: 'post',
                        url:`${process.env.API_URL}/media/video-upload`,
                        data: bodyFormData,
                        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      })
      
      const data = await res.data
      data.success && dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_SUCCESS, payload: data })
      data.success && dispatch({ type: types.modals.CLOSE_MODAL })
      data.success && dispatch(clearData())
      !data.success && dispatch({ type: types.user.UPDATE_USER_PROFILE_VIDEO_FAIL })
      dispatch(userInit())
    } catch (e) {
      console.error(e)
    }
  }