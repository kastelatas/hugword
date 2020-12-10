import * as _ from 'lodash'
import types from '../types'

const setReadtoNull = (contacts, id) => {
  return contacts && contacts.map((i) => (i?.user?.id === id ? { ...i, unread: 0 } : i))
}

const updateContactItems = (contactItems, item, idx) => {
  if (!contactItems) {
    return []
  }

  if (item.count === 0) {
    return [...contactItems.slice(0, idx), ...contactItems.slice(idx + 1)]
  }

  if (idx === -1) {
    return [...contactItems, item]
  }

  return [...contactItems.slice(0, idx), item, ...contactItems.slice(idx + 1)]
}

const addMessageHistoryToContact = (contactItems, contactId, messages) => {
  const ct = contactItems && contactItems.find((i) => i?.user?.id === parseInt(contactId))
  const itemIndex = contactItems && contactItems.findIndex((i) => i?.user?.id === parseInt(contactId))
  const newItem = {
    ...ct,
    message: ct && ct.message ? _.uniqBy([...ct.message, ...messages], (i) => i.id) : [...messages],
  }
    return ct ? updateContactItems(contactItems, newItem, itemIndex) : contactItems

  // return updateContactItems(contactItems, newItem, itemIndex)
}

const setUpcomigMessageToChat = (contacts, message) => {
  const ct = contacts && contacts.find((i) => i?.user?.id === message.to)
  const itemIndex = contacts && contacts.findIndex((i) => i?.user?.id === message.to)
  const newItem = { ...ct, message: ct && ct.message ? [...ct.message, message] : [message] }

  if (!(contacts && contacts.length) && !ct) {
    return [
      {
        user: { id: message.client_id, type: message.direction },
        messages: [message],
      },
    ]
  }

  return updateContactItems(contacts, newItem, itemIndex)
}

const findInContact = (contacts, newContactId) => {
  const ct = contacts && contacts.find((i) => i?.user?.id === parseInt(newContactId))
  return ct
}

const findContactIDXInList = (contacts, newContactId) => {
  const ct = contacts && contacts.find((i) => i?.user?.id === parseInt(newContactId))
  const itemIndex = contacts && contacts.findIndex((i) => i?.user?.id === parseInt(newContactId))
  return itemIndex
}

const checkForDublicateContactInList = (contacts, newContact) => {
  const ct = contacts && contacts.find((i) => i?.user?.id === newContact?.user?.id)

  if (ct) {
    return [...contacts]
  }

  return [...contacts, newContact]
}

const mergeNewContactsWithList = (contacts, newContacts) => {
  if (contacts) {
    if ( newContacts?.length) {
      return _.uniqBy([...contacts, ...newContacts], (i) => i.user.id)
    }
      return [...contacts]
  }
  return newContacts && newContacts.length ? [...newContacts] : newContacts
}

const removeLastItem = (contacts, message) => {
  const ct = contacts && contacts.find((i) => i?.user?.id === message.payload.ambassador_id)
  const itemIndex = contacts && contacts.findIndex((i) => i?.user?.id === message.payload.ambassador_id)
  const newItem = { ...ct, message: [..._.dropRight(ct.message)] }

  return updateContactItems(contacts, newItem, itemIndex)
}

const checkForCurrContact = (currUser, message) => {
  const setUserType = message?.direction === 1 ? 'client_id' : 'ambassador_id'
  return currUser?.id === message[setUserType]
}

const setMessageToContact = (contacts, message, curUser) => {
  const setUserType = message.direction === 1 ? 'client_id' : 'ambassador_id'
  const ct = contacts && contacts.find((i) => i?.user?.id === message[setUserType])
  const itemIndex = contacts && contacts.findIndex((i) => i?.user?.id === message[setUserType])

  const newItem = {
    ...ct,
    last_message: message,
    unread: ct && (checkForCurrContact(curUser, message) ? ct?.unread : ct?.unread + 1),
    message: ct && ct.message ? [...ct.message, message] : [message],
  }

  if (ct) {
    return updateContactItems(contacts, newItem, itemIndex)
  }

  if (!(contacts && contacts.length) && !ct) {
    return [
      {
        user: { id: message.client_id, type: message.direction },
        messages: [message],
      },
    ]
  }

  return [
    ...contacts,
    // {
    //   user: {
    //     id: message.client_id,
    //     type: message.direction,
    //   },
    //   messages: [message],
    //   seen: 0,
    //   unread: 1,
    // },
  ]
}

const initialState = {
  contacts: null,
  contact: {},
  favoritesContacts: null,
  messages: [],
  loading: false,
  newMessage: null,
  typing: false,
  pushes: [],
}

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.chat.SEND_MESSAGE:
      return { ...state, contacts: setUpcomigMessageToChat(state.contacts, action.payload), loading: false }

    case types.chat.GET_MESSAGE:
      return {
        ...state,
        contacts: setMessageToContact(state.contacts, action.payload.payload, action.payload.currUser),
        newMessage: action.payload,
        loading: false,
        typing: false
      }

    case types.chat.GET_SOCKET_CONTACT_LIST:
      return { ...state, contacts: mergeNewContactsWithList(state.contacts, action.payload?.contacts) , pushes: [...state.pushes, ...action.payload?.pushes] }

    case types.chat.GET_SOCKET_MESSAGE_SENT:
      const newContacts = state.contacts.map((i) => {
        const setUserType = action.payload?.direction === 2 ? 'client_id' : 'ambassador_id'
        return i?.user?.id === action?.payload[setUserType]
          ? {
              ...i,
              message: i.message ? i.message.map((i) => (i.tag === action.payload?.tag ? { ...i, id: action.payload?.id } : i)) : i.message,
            }
          : i
      })

      return { ...state, contacts: newContacts }

    case types.chat.ADD_SOCKET_TYPING_START:
      return { ...state, typing: action.payload }

    case types.chat.ADD_SOCKET_TYPING_END:
      return { ...state, typing: false }

    case types.chat.ADD_TO_CONTACT:
      return { ...state, contacts: mergeNewContactsWithList(state.contacts, [action.payload]) }

    case types.chat.ADD_TO_FAVORITES:
      return {
        ...state,
        favoritesContacts: state.favoritesContacts
          ? [...state.favoritesContacts, findInContact(state.contacts, action.payload)]
          : [findInContact(state.contacts, action.payload)],
      }

    case types.chat.ADD_SOCKET_TO_CONTACT:
      return {
        ...state,
        contacts: state.contacts ? checkForDublicateContactInList(state.contacts, action.payload) : [action.payload],
      }

    case types.chat.GET_SOCKET_MESSAGE_SEEN:
      const items = state.contacts.map((i) =>
        i?.user?.id === action.payload.user_id ? { ...i, seen: action.payload.message_id } : i,
      )
      return { ...state, contacts: state.contacts ? items : state.contacts }

    case 'DELETE_LAST_MESSAGE':
      return { ...state, contacts: removeLastItem(state.contacts, action.payload) }

    case 'SET_TO_READ':
      return { ...state, contacts: setReadtoNull(state.contacts, action.payload) }

    case types.chat.SET_CURR_CONTACT:
      return { ...state, contact: action.payload }

    case types.chat.REMOVE_CONTACT:
      return { ...state, contacts: state.contacts.filter((i) => i?.user?.id !== action.payload) }

    case types.chat.REMOVE_FAVORITE_CONTACT:
      return { ...state, favoritesContacts: state.favoritesContacts.filter((i) => i?.user?.id !== action.payload) }

    case types.chat.GET_MESSAGE_HISTORY_REQUEST:
      return { ...state, loading: true }
    case types.chat.GET_MESSAGE_HISTORY_SUCCESS:
      return {
        ...state,
        contacts: addMessageHistoryToContact(state.contacts, action.payload.contactId, action.payload.messages),
        loading: false,
      }
    case types.chat.GET_MESSAGE_HISTORY_FAIL:
      return { ...state, loading: false }

    case types.chat.GET_FAVORITES_CONTACT_REQUEST:
      return { ...state, loading: true }
    case types.chat.GET_FAVORITES_CONTACT_SUCCESS:
      return { ...state, favoritesContacts: action.payload.data, loading: false }
    case types.chat.GET_FAVORITES_CONTACT_FAIL:
      return { ...state, loading: false }

    case 'CLEAR_CHAT':
      return { ...state, contacts: null, loading: false }

    default:
      return { ...state }
  }
}
export default chatReducer
