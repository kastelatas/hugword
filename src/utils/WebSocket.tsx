import React, { createContext, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNotification, getPushes } from '@src/redux/actions/notifications'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import {
  addSocketToContactList,
  getMessage,
  getSocketMessageSent,
  getMessageSeen,
  getContactListSocket,
  addSocketTypingStart,
  addSocketTypingEnd,
} from '@src/redux/actions/chat'
import { System_notification } from "@src/ts/enum/system_notification";

const WebSocketContext = createContext(null)

export { WebSocketContext }

const Socket = ({ children }) => {
  const dispatch = useDispatch()
  const auth = useSelector(({ auth }) => auth.user)
  const ws = useRef(null)
  const hostname = process.env.API_DEV_HOST

  const wss = {
    ws,
    sendMessage(obj) {
      try {
        ws.current.send(
          JSON.stringify({
            type: 'message',
            payload: obj,
          }),
        )
      } catch (error) {
        console.error(error, 'error')
      }
    },
    typeMessageStart(obj) {
      try {
        ws.current.send(
          JSON.stringify({
            type: 'typing-start',
            payload: obj,
          }),
        )
      } catch (error) {
        console.error(error, 'error')
      }
    },
    typeMessageEnd(obj) {
      try {
        ws.current.send(
          JSON.stringify({
            type: 'typing-stop',
            payload: obj,
          }),
        )
      } catch (error) {
        console.error(error, 'error')
      }
    },
    addToFavorite(contactId) {
      try {
        ws.current.send(
          JSON.stringify({
            type: 'favorite-add',
            payload: { id: contactId },
          }),
        )
      } catch (error) {
        console.error(error, 'error')
      }
    },
    removeFromFavorites(contactId) {
      try {
        ws.current.send(
          JSON.stringify({
            type: 'favorite-remove',
            payload: { id: contactId },
          }),
        )
      } catch (error) {
        console.error(error, 'error')
      }
    },
    removeContact(contactId) {
      try {
        ws.current.send(
          JSON.stringify({
            type: 'contact-remove',
            payload: { id: contactId },
          }),
        )
      } catch (error) {
        console.error(error, 'error')
      }
    },
  }

  const removeLastMessage = (message: any, modalTypeName: ModalsType) => {
    dispatch(openModal({ modalType: modalTypeName }))
    dispatch({ type: 'DELETE_LAST_MESSAGE', payload: message })
  }

  useEffect(() => {
    const schema = location.protocol
    const socketURI = schema === 'http:' ? 'ws' : 'wss'

    if (auth) {
      const token = localStorage.getItem('Authorization')
      ws.current = new WebSocket(`${socketURI}://api2.dev.hugword.com/ws/${token}`)
      ws.current.onopen = () => console.log('ws opened')
      ws.current.onclose = (e) => {
        console.error('Socket is closed.Reconnect will be attempted in 1 second.', e.reason)
        setTimeout(() => new WebSocket(`${socketURI}://api2.dev.hugword.com/ws/${token}`), 1000)
      }

      ws.current.onmessage = (e) => {
        const message = JSON.parse(e.data)
        message.type === 'init' && dispatch(getContactListSocket(message))
        message.type === 'message-sent' && dispatch(getSocketMessageSent(message))
        message.type === 'message' && dispatch(getMessage(message))
        message.type === 'init' && dispatch(getPushes(message))
        message.type === 'seen' && dispatch(getMessageSeen(message))
        message.type === 'notification' && dispatch(getNotification(message))
        message.type === 'notification' && message.payload?.notification?.type === System_notification.TYPE_PERSONAL_PROFILE_COMMENT_REQUEST  && dispatch(openModal({ modalType: ModalsType.FILL_WITH }))
        message.type === 'notification' && message.payload?.notification?.type === System_notification.TYPE_SYSTEM_PAYMENT  && dispatch(openModal({ modalType: ModalsType.SUCCESS_BALANSES }))
        message.type === 'online' && dispatch(getNotification(message))
        message.type === 'message-need-registration' && removeLastMessage(message, ModalsType.VERIFICATION_MODAL)
        message.type === 'contact-add' && dispatch(addSocketToContactList(message))
        message.type === 'typing-start' && dispatch(addSocketTypingStart(message))
        message.type === 'typing-stop' && dispatch(addSocketTypingEnd(message))
        message.type === 'message-need-talkens' && removeLastMessage(message, ModalsType.NOT_TALKENS)
        message.type === 'message-need-cache' && removeLastMessage(message, ModalsType.NOT_CASH)
      }

      ws.current.onerror = (e) => console.error('ws error', e?.message)
    }

    return () => {
      ws.current && ws.current.close()
    }
  }, [auth])

  return <WebSocketContext.Provider value={wss}>{children}</WebSocketContext.Provider>
}

export default Socket
