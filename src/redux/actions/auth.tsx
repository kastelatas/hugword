import { closeLoadingModal, closeModal, openLoadingModal, openModal } from '@src/redux/actions/modals'
import axios from 'axios'
import Router from 'next/router'
import { getAmbassadorById } from '@src/redux/actions/ambassador'
import { clearData } from '@src/redux/actions/user'
import { ModalsType } from '@src/ts/enum/modal_enum'
import types from '../types'

export const auth = () => async (dispatch) => {
  await dispatch({ type: types.auth.AUTH })
  await dispatch(closeModal())
}

export const login = (username, password) => async (dispatch) => {
  dispatch({ type: types.auth.LOGIN_REQUEST })
  try {
    const res = await axios.post(
      `${process.env.API_URL}/user/login?expand=profile.photos.image,profile.topics.topic,profile.secondaryTopics.topic,profile.photo,profile.avatar,profile.cover,profile.rankTitle,profile.comments.client.profile.avatar.image`,
      JSON.stringify({ login: username, password }),
    )
    const data = await res.data
    data.success && localStorage.setItem('Authorization', `${data.data.token}`)
    data.success && dispatch({ type: types.auth.LOGIN_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.auth.LOGIN_FAIL, payload: data.errors })
    data.success && dispatch({ type: types.modals.CLOSE_MODAL })
  } catch (e) {
    console.error(e)
  }
}

export const userInit = ({fingerprint, token}) => async (dispatch) => {
  dispatch({ type: types.auth.LOGIN_USER_INIT_REQUEST })
  const url = fingerprint ?
    `${process.env.API_URL}/user/init?fingerprint=${fingerprint}&expand=profile.avatar` :
    `${process.env.API_URL}/user/init?expand=profile.avatar`
  try {
    const res = await axios.get(url, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && !token && localStorage.setItem('Authorization', `${data.data.token}`)
    data.success && token && localStorage.setItem('Authorization', `${token}`)
    data.success && dispatch({ type: types.auth.LOGIN_USER_INIT_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.auth.LOGIN_USER_INIT_FAIL, payload: data.errors })
  } catch (e) {
    console.error(e)
  }
}

export const signUp = (username, password, name) => async (dispatch) => {
  dispatch({ type: types.auth.SIGN_UP_USER_REQUEST })
  try {
    const res = await axios.post(
      `${process.env.API_URL}/user/registration`,
      JSON.stringify({ login: username, password, name }),
    )
    const data = await res.data
    data.success && dispatch({ type: types.auth.SIGN_UP_USER_SUCCESS, payload: data })
    data.success && dispatch(login(username, password))
    !data.success && dispatch({ type: types.auth.SIGN_UP_USER_FAIL, payload: data.errors })
  } catch (e) {
    console.error(e)
  }
}

export const setEmail = (email) => async (dispatch) => {
  dispatch({ type: types.auth.SET_EMAIL_REQUEST })
  try {
    const res = await axios.post(`${process.env.API_URL}/user/set-email`, JSON.stringify({ email }), {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.auth.SET_EMAIL_SUCCESS, payload: data })
    data.success && dispatch(openModal({ modalType: ModalsType.MAIL_SENDING }))
    !data.success && dispatch({ type: types.auth.SET_EMAIL_FAIL, payload: data.errors })
  } catch (e) {
    console.error(e)
  }
}

export const logout = () => (dispatch) => {
  Router.replace('/')
  localStorage.removeItem('Authorization')
  dispatch({ type: types.auth.LOGOUT })
  dispatch({ type: 'CLEAR_AMBASSADORS' })
  dispatch({ type: 'CLEAR_CHAT' })
}

export const setPasswordConfirm = (token) => async (dispatch) => {
  dispatch({ type: types.auth.GET_PASSWORD_CONFIRM_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/user/set-password-confirm/${token}`)
    const data = await res.data
    data.success && dispatch({ type: types.auth.GET_PASSWORD_CONFIRM_SUCCESS, payload: data })
    data.success && dispatch(openModal({ modalType: ModalsType.SUCCESS }))
    !data.success && dispatch(openModal({ modalType: ModalsType.ERROR }))
    !data.success && dispatch({ type: types.auth.GET_PASSWORD_CONFIRM_FAIL, payload: data.errors })
  } catch (e) {
    console.error(e)
  }
}

export const setEmailConfirm = (email, token, slug) => async (dispatch) => {
  dispatch({ type: types.auth.GET_EMAIL_CONFIRM_REQUEST })
  try {
    const res = await axios.get(`${process.env.API_URL}/user/${slug}/${email}/${token}`)
    const data = await res.data
    data.success && dispatch({ type: types.auth.GET_EMAIL_CONFIRM_SUCCESS, payload: data })
    data.success && slug !== 'verify-email-confirm' && dispatch(openModal({ modalType: ModalsType.SUCCESS }))
    data.success && slug === 'verify-email-confirm' && dispatch(openModal({ modalType: ModalsType.VERIFYED }))
    !data.success && dispatch(openModal({ modalType: ModalsType.ERROR }))
    !data.success && dispatch({ type: types.auth.GET_EMAIL_CONFIRM_FAIL, payload: data.errors })
  } catch (e) {
    console.error(e)
  }
}

export const verifyEmail = (userEmail) => async (dispatch) => {
  dispatch({ type: types.auth.SET_VERIFY_EMAIL_REQUEST })
  dispatch(openLoadingModal())
  try {
    const res = await axios.post(`${process.env.API_URL}/user/verify-email`, JSON.stringify({ email: userEmail }), {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    dispatch(closeLoadingModal())
    data.success && dispatch({ type: types.auth.SET_VERIFY_EMAIL_SUCCESS, payload: data })
    data.success && dispatch(openModal({ modalType: ModalsType.MAIL_SENDING }))
    !data.success && dispatch(openModal({ modalType: ModalsType.ERROR }))
    !data.success && dispatch({ type: types.auth.SET_VERIFY_EMAIL_FAIL, payload: data.errors })
  } catch (e) {
    console.error(e)
    dispatch(closeLoadingModal())
  }
}

export const resetPassword = (email: string) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.auth.RESET_PASSWORD_REQUEST })
  dispatch(openLoadingModal())
  try {
    const res = await axios.post(`${process.env.API_URL}/user/reset-password`, JSON.stringify({ email }), {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    dispatch(closeLoadingModal())
    data.success && dispatch({ type: types.auth.RESET_PASSWORD_SUCCESS, payload: data })
    data.success && dispatch(openModal({ modalType: ModalsType.MAIL_SENDING }))
    !data.success && dispatch({ type: types.auth.RESET_PASSWORD_FAIL, payload: data })
  } catch (e) {
    console.error(e)
    dispatch(closeLoadingModal())
  }
}

export const resetPasswordConfirm = (email: string) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.auth.RESET_PASSWORD_CONFIRM_REQUEST })
  dispatch(openLoadingModal())
  try {
    const res = await axios.post(`${process.env.API_URL}/user/reset-password-confirm`, JSON.stringify({ email }), {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    dispatch(closeLoadingModal())
    data.success && dispatch({ type: types.auth.RESET_PASSWORD_CONFIRM_SUCCESS, payload: data })
    data.success && dispatch(openModal({ modalType: ModalsType.MAIL_SENDING }))
    !data.success && dispatch({ type: types.auth.RESET_PASSWORD_CONFIRM_FAIL, payload: data })
  } catch (e) {
    console.error(e)
    dispatch(closeLoadingModal())
  }
}
