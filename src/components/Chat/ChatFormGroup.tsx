import React, { useContext, useState, useEffect } from 'react'
import IconButton from '@src/components/Button/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { WebSocketContext } from '@src/utils/WebSocket'
import { addSocketTypingEnd, sendMessage } from '@src/redux/actions/chat'
import { UserTypeConvertTooId } from '@src/ts/enum/user_enum'
import useThrottle from '@src/hooks/useThorttle'
import useDebouncedEffect from '@src/hooks/useDebounce'
import smilesIcon from '../../../public/icons/smiles.svg'
import attachIcon from '../../../public/icons/attach.svg'
import sendIcon from '../../../public/icons/send.svg'

const ChatFormGroup = ({ disabled }) => {
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()
  const wss = useContext(WebSocketContext)
  const chatAmbassador = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const typing = useSelector(({ chat: { typing } }) => typing)
  const user = useSelector(({ auth: { user } }) => user)
  const placeholderText = 'Type something...'

  const throttledCb = useThrottle(() => wss.typeMessageStart({ id: chatAmbassador?.id }), 1000)

  useDebouncedEffect(() => inputValue && wss.typeMessageEnd({ id: chatAmbassador?.id }), 1000, [inputValue])

  useEffect(() => {
    inputValue && throttledCb()
  }, [inputValue])

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setInputValue(event.target.value)
  }

  const obj = {
    type: 'default',
    to: chatAmbassador?.id,
    text: inputValue,
    tag: uuidv4(),
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    inputValue &&
      dispatch(
        sendMessage({
          id: `temp${uuidv4()}`,
          from: user?.id,
          isNew: true,
          ts: Math.floor(Date.now() / 1000),
          ...obj,
        }),
      )
    inputValue && wss.sendMessage(obj)
    setInputValue('')
  }

  return (
    <form
      className="chat__input-group"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          handleSubmit(e)
        }
      }}
    >
      <input
        type="text"
        disabled={disabled}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholderText}
        onFocus={(e) => (e.target.placeholder = '')}
        onBlur={(e) => (e.target.placeholder = placeholderText)}
      />
      <div className="chat__append">
        <IconButton icon={smilesIcon} />
        <IconButton icon={attachIcon} />
        <IconButton icon={sendIcon} send onClick={(e) => handleSubmit(e)} />
      </div>
    </form>
  )
}

export default ChatFormGroup
