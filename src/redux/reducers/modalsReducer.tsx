import { ModalsType } from '@src/ts/enum/modal_enum'
import types from '../types'

const initialState = {
  modalOpen: false,
  loadingOpen: false,
  modalType: {},
}

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.modals.OPEN_MODAL:
      return { ...state, modalOpen: true, modalType: action.payload }
    case types.modals.CLOSE_MODAL:
      return { ...state, modalOpen: false }

    case types.modals.OPEN_LOADING_MODAL:
      return { ...state, loadingOpen: true }
    case types.modals.CLOSE_LOADING_MODAL:
      return { ...state, loadingOpen: false }
    default:
      return { ...state }
  }
}

export default modalsReducer
