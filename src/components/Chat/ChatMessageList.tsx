import React, { useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContactHistory, getFavoriteHistory } from '@src/redux/actions/chat'
import { useRouter } from 'next/router'
import { openModal } from '@src/redux/actions/modals'
import { ModalsType } from '@src/ts/enum/modal_enum'
import ChatMessage from './ChatMessage'

const ChatMessageList = ({ currUserId }) => {
  const dispatch = useDispatch()
  const route = useRouter()

  const contacts = useSelector(({ chat: { contacts } }) => contacts)
  const user = useSelector(({ auth: { user } }) => user)
  const ambassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const currContact = contacts && user && contacts.find((i) => i?.user?.id === parseInt(route.query?.slug))

  const messagesEndRef = useRef(null)

  useEffect(() => {
    currUserId &&
      Boolean(contacts && contacts.length) &&
      user &&
      user.id &&
      dispatch(getContactHistory(currUserId, user.id))
      user &&
      user.id &&
      dispatch(getFavoriteHistory(currUserId, user.id))
  }, [currUserId, user])

  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
  }

  useEffect(() => {
    user && scrollToBottom()
  }, [contacts, user])
  if (!user) {
    return null
  }


  const showReviewsPopup = () => {
    if (currContact.message) {
      currContact.message.length > 3 && dispatch(openModal({ modalType: ModalsType.FILL_WITH }))
    }
  }

  // currContact.message &&
  //   ambassador.profile?.comments.length > 0
  //   ? ambassador.profile?.comments.map((comments) => {
  //
  //       if (comments.client_id == user.id) {
  //         showReviewsPopup()
  //       }
  //     })
  //   : setTimeout(() => showReviewsPopup(), 5000)

  // console.log(ambassador.profile?.comments)
  // console.log(currContact.message)

  // showReviewsPopup()

  return (
    <div className="chat__list">
      {Boolean(currContact && currContact.message && currContact.message.length) &&
        currContact.message.map((i) => <ChatMessage key={i.id} read={currContact.seen >= i.id} {...i} />)}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessageList
