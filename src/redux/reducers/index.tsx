import { combineReducers } from 'redux'
import ambassadorReducer from './ambassadorReducer'
import modalsReducer from './modalsReducer'
import chatReducer from './chatReducer'
import userReducer from './userReducer'
import newsReducer from './newsReducer'
import authReducer from './authReducer'
import faqReducer from './faqReducer'
import aboutReducer from './aboutReducer'
import notificationsReducer from './notificationsReducer'
import chartsReducer from './chartsReducer'
import dashboardReducer from './dasboardReducer'
import profileReducer from './profileReducer'

export default combineReducers({
  ambassador: ambassadorReducer,
  modals: modalsReducer,
  chat: chatReducer,
  user: userReducer,
  auth: authReducer,
  news: newsReducer,
  faq: faqReducer,
  about: aboutReducer,
  notifications: notificationsReducer,
  charts: chartsReducer,
  dashboard: dashboardReducer,
  profile: profileReducer,
})