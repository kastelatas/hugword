import types from "@src/redux/types";
import Router from "next/router";
import { getContactHistory } from "@src/redux/actions/chat";

export const getNotification = ({ payload }) => (dispatch) => {
  dispatch({ type: types.notifications.GET_SOCKET_NOTIFICATIONS, payload })
}

export const removeNotification = () => (dispatch) => {
  dispatch({ type: types.notifications.REMOVE_SOCKET_NOTIFICATIONS })
}

export const getPushes = ({ payload }) => (dispatch) =>  {
  dispatch( { type: types.notifications.GET_SOCKET_PUSHES, payload })
}