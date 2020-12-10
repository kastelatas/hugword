import axios from 'axios'
import types from '../types'
import Router from "next/router";

export const sendMessage = (payload) => (dispatch) => {
  dispatch({ type: types.chat.SEND_MESSAGE, payload })
}

export const getMessage = ({ payload }) => (dispatch, state) => {
  dispatch({ type: types.chat.GET_MESSAGE, payload: {payload, currUser: state().ambassador.ambassador } })
}

export const getMessageSeen = ({ payload }) => (dispatch) => {
  dispatch({ type: types.chat.GET_SOCKET_MESSAGE_SEEN, payload })
}

export const getContactListSocket = ({ payload }) => (dispatch) =>  {
  dispatch( { type: types.chat.GET_SOCKET_CONTACT_LIST, payload })
  payload.user.id && Router.query.slug && dispatch( getContactHistory(Router.query.slug, payload.user.id))

}

export const getContactHistory = (contactId, userId) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.chat.GET_MESSAGE_HISTORY_REQUEST })
  try {
    const params = { id: userId }
    const res = await axios.get(`//api2.dev.hugword.com/history/${params.id}/{"id": ${contactId}}`, {
      headers: { Token: localStorage.getItem('Authorization') },
    })
    const data = await res.data
    dispatch({ type: types.chat.GET_MESSAGE_HISTORY_SUCCESS, payload: { contactId, messages: data }})
  } catch (e) {
    console.error(e)
    dispatch({ type: types.chat.GET_MESSAGE_HISTORY_FAIL })
  }
}

export const getFavoriteHistory = (contactId, userId) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.chat.GET_FAVORITES_CONTACT_REQUEST })
  try {
    const res = await axios.get(`//api2.dev.hugword.com/favorites`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
    })
    const data = await res.data
    data.success && dispatch({ type: types.chat.GET_FAVORITES_CONTACT_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.chat.GET_FAVORITES_CONTACT_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}

/*export const addToFavorite = (contactId, userId) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.chat.ADD_TO_FAVORITES_REQUEST })
  try {
    const res = await axios.post(
      `${process.env.API_URL}:9999/favorites`,
      { type: 'favorite-add', payload: { id: 2 } },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('Authorization')}` },
      },
    )
    const data = await res.data
    data.success && dispatch({ type: types.chat.ADD_TO_FAVORITES_SUCCESS, payload: data })
    !data.success && dispatch({ type: types.chat.ADD_TO_FAVORITES_FAIL, payload: data })
  } catch (e) {
    console.error(e)
  }
}*/

export const addToFavorite = (user) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.chat.ADD_TO_FAVORITES, payload:user })

}

export const removeFavoriteContact = (contactId) => async (
  dispatch: (arg0: { type: string; payload?: any }) => void,
) => {
  dispatch({ type: types.chat.REMOVE_FAVORITE_CONTACT, payload:contactId })
}

export const removeContact = (contactId) => (dispatch: (arg0: { type: string; payload?: any }) => void, state) => {
  state().ambassador?.ambassador?.id === contactId && Router.push('/chat')
  dispatch({ type: types.chat.REMOVE_CONTACT, payload: contactId })
}

export const addToContactList = (contact) => (dispatch: (arg0: { type: string; payload?: any }) => void, state) => {
  dispatch({ type: types.chat.ADD_TO_CONTACT, payload: contact })
}

export const addSocketToContactList = (contact) => (dispatch: (arg0: { type: string; payload?: any }) => void, state) => {
  dispatch({ type: types.chat.ADD_SOCKET_TO_CONTACT, payload: contact.payload })
}

export const addSocketTypingStart = (contact) => (dispatch: (arg0: { type: string; payload?: any }) => void, state) => {
  dispatch({ type: types.chat.ADD_SOCKET_TYPING_START, payload: contact.payload })
}

export const addSocketTypingEnd = (contact) => (dispatch: (arg0: { type: string; payload?: any }) => void, state) => {
  dispatch({ type: types.chat.ADD_SOCKET_TYPING_END })
}

export const getSocketMessageSent = ({ payload }) => (dispatch) => {
  dispatch({
    type: types.chat.GET_SOCKET_MESSAGE_SENT,
    payload,
  })
}
