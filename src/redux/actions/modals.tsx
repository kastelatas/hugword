import types from '../types'

export const openModal = (type) => ({
  type: types.modals.OPEN_MODAL,
  payload: type
})

export const openLoadingModal = (type) => ({
  type: types.modals.OPEN_LOADING_MODAL,
  payload: type
})

export const closeLoadingModal = () => ({
  type: types.modals.CLOSE_LOADING_MODAL,
})

export const closeModal = () => ({
  type: types.modals.CLOSE_MODAL,
})
