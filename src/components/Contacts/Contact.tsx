import React, {useContext, useEffect} from 'react'
import Link from 'next/link'
import classnames from 'classnames'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import {UserTypeConvertTooUrl} from '@src/ts/enum/user_enum'
import {removeContact, removeFavoriteContact} from '@src/redux/actions/chat'
import {WebSocketContext} from "@src/utils/WebSocket"
import {convertFromTimeStampToDate} from '@src/utils/DateTimeHelper'
import Ava from '@src/components/Ava'
import Button from '@src/components/Button/Button'
import closeIcon from '../../../public/icons/close.svg'
import * as _ from 'lodash'

const Contact = (props: { message: any; isNotFavorite: boolean; text: any; user: any; id: any }) => {
  const {message, text, unread, isNotFavorite, last_message, user, id} = props
  const wss = useContext(WebSocketContext)
  const router = useRouter()
  const dispatch = useDispatch()
  const ambassador = useSelector(({ambassador: {ambassador}}) => ambassador)
  const currUser = useSelector(({auth: {user}}) => user)
  const currUserId = parseInt(router.query?.slug as string)
  const lastMessage = last_message || message && message.length && _.last(message)

  const root = classnames('contact', {
    contact_active: !router.query?.slug ? ambassador?.id === id : currUserId === id,
  })

  useEffect(() => {
    currUserId === user?.id && dispatch({type: 'SET_TO_READ', payload: user?.id})
  }, [currUserId])

  const handleRemoveContact = () => {
    wss.removeContact(id)
    dispatch(removeContact(id))
  }

  const handleRemoveFavoriteContact = () => {
    wss.removeFromFavorites(id)
    dispatch(removeFavoriteContact(id))
  }

  return (
    <div className="contact-wrapper">
      <Link href="/chat/[userType]/[slug]" as={`/chat/${UserTypeConvertTooUrl[currUser?.type]}/${id}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={root}>
          <Ava
            noImg={!(user?.avatar && user?.avatar.length)}
            abbr={user?.name && user?.name[0]}
            online={user?.state?.online}
            img={`${process.env.API_IMG_URL}${user?.avatar}`}
          />
          <div className="contact__content">
            <div className="contact__title">{user?.name}</div>
            {Boolean(lastMessage) && <div className="contact__message">{lastMessage?.text}</div>}
          </div>
          <div className="contact__info">
            {Boolean(unread) && currUserId !== user?.id &&  <div className="counts">{unread > 9 ? '9+' : unread}</div>}
            {Boolean(lastMessage) && <div className="contact__date">{convertFromTimeStampToDate(lastMessage?.ts)}</div>}
          </div>
        </a>
      </Link>
      <Button icon={closeIcon} onClick={isNotFavorite ? handleRemoveContact : handleRemoveFavoriteContact} />
    </div>
  )
}

export default Contact
