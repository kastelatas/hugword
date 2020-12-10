import { createStore, applyMiddleware, AnyAction } from 'redux'
import { HYDRATE, createWrapper, Context, MakeStore } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './reducers'

const bindMiddleware = (middleware: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    middleware.push(
      createLogger({
        level: 'info',
        collapsed: true,
      }),
    )
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export interface State {
  ambassador: []
  notifications: []
  chat: [],
  charts: {},
  dashboard: {},
  user: {}
  auth: {
    user?: any
  }
  modals: {
    modalOpen: boolean
  }
}

const reducer = (state: State, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    // preserve count value on client side navigation
    if (state.modals) nextState.modals.modalOpen = state.modals.modalOpen
    if (state.ambassador.list.length) nextState.ambassador.list = state.ambassador.list
    if (state.chat) nextState.chat = state.chat
    if (state.auth) nextState.auth = state.auth
    if (state.dashboard) nextState.dashboard = state.dashboard
    if (state.charts) nextState.charts = state.charts
    if (state.auth.user) nextState.auth.user = state.auth.user
    if (state.user) nextState.user = state.user
    if (state.notifications) nextState.notifications = state.notifications
    return nextState
  }
  return reducers(state, action)
}

const initStore: MakeStore<State> = () => createStore(reducer, bindMiddleware([thunkMiddleware]))

export const wrapper = createWrapper<State>(initStore)
