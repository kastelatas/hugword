import React from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import InlineSVG from 'react-inlinesvg'
import { convertFromTimeStampToDate } from '@src/utils/DateTimeHelper'
import Ava from '../Ava'
import messageNotSend from '../../../public/icons/close.svg'
import messageCheckIcon from '../../../public/icons/message-check.svg'
import messageReadIcon from '../../../public/icons/chat/message-read.svg'

interface IMessage {
  text: string
  isNew: boolean
  read: boolean
  direction: number
  ts: number
  id: any
  seen: number
}

const ChatMessageComponent: React.FC<IMessage> = (props) => {
  const { text, id, direction, seen, read, isNew, ts } = props
  const userContact = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const user = useSelector(({ auth: { user } }) => user)
  const right = direction === user?.type || isNew
  const notSent = typeof id === 'string' && id.slice(0, 4) === 'temp'

  const root = classNames('chat__message-block', {
    'chat__message-block_left': !right,
    'chat__message-block_right': right,
  })

  const iconSet = () => {
    if (notSent) {
      return messageNotSend
    }

    if (read) {
      return messageReadIcon
    }

    return messageCheckIcon
  }

  const acceptIcon = classNames('chat__message-accept', {
    'chat__message-accept_hide': !right,
  })

  return (
    <div className={root}>
      {!right && (
        <Ava
          noImg={!userContact?.profile?.avatar}
          abbr={userContact?.profile?.name[0]}
          img={`${process.env.API_IMG_URL}${userContact?.profile?.avatar?.path}`}
        />
      )}
      <div className="chat__message">
        <div className="chat__message-text">{text}</div>
        <div className="chat__message-time">{convertFromTimeStampToDate(ts)}</div>
        {right && <InlineSVG className={acceptIcon} src={iconSet()} />}
      </div>
    </div>
  )
}

// Attention for rerender only by id compare
const areEqual = (prevProps, nextProps) => {
  return prevProps.id === nextProps.id
}

const ChatMessage = React.memo(ChatMessageComponent, areEqual)
export default ChatMessage
