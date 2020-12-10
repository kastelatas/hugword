import React, {useContext, useEffect, useState} from 'react'
import classNames from "classnames";
import IconButton from '@src/components/Button/IconButton'
import { addToFavorite } from '@src/redux/actions/chat'
import { useDispatch, useSelector } from 'react-redux'
import { WebSocketContext } from '@src/utils/WebSocket'
import JumpingDots from '@src/components/JumpingDots'
import favouriteIcon from '../../../public/icons/favourite.svg'
import favouriteFullIcon from '../../../public/icons/star-full.svg'
import blockIcon from '../../../public/icons/block.svg'
import presentIcon from '../../../public/icons/present.svg'
import shopIcon from '../../../public/icons/shop.svg'

const ChatHeader = () => {
  const dispatch = useDispatch()
  const wss = useContext(WebSocketContext)
  const user = useSelector(({ ambassador: { ambassador } }) => ambassador)
  const favorites = useSelector(({ chat: { favoritesContacts } }) => favoritesContacts)
  const [isTyping, setTyping] = useState(false)
  const [isFavorite, setFavorite] = useState(false)
  const typing = useSelector(({ chat: { typing } }) => typing)

  useEffect(() => {
    typing && user?.id === typing.id ? setTyping(true) : setTyping(false)
  }, [user?.id, typing])

  useEffect(() => {
    const isFav = favorites && favorites.find( i => i?.user?.id === user?.id)
    setFavorite(isFav)
  }, [user?.id, favorites && favorites.length])

  const root = classNames('chat__title', {
    chat__title_online: user?.state?.online,
  })

  const addToFavorites = () => {
    dispatch(addToFavorite(user?.id))
    user?.id && wss.addToFavorite(user?.id)
  }

  return (
    <div className="chat__header">
      <div className="chat__col">
        <div className="chat__row">
          {user?.profile?.name && <span className={root}>{user?.profile?.name}</span>}
          {isTyping && <span className="chat__text">Typing<JumpingDots/></span>}
        </div>
        {/* <span className="chat__text">Relationship tips and dating advice</span> */}
      </div>

      <div className="chat__actions">
        <IconButton icon={!isFavorite ? favouriteIcon : favouriteFullIcon} onClick={!isFavorite ? addToFavorites : undefined} />
        {/*<IconButton icon={blockIcon} />*/}
        {/*<IconButton icon={presentIcon} gift />*/}
        {/*<IconButton icon={shopIcon} shop to="/shop" />*/}
      </div>
    </div>
  )
}

export default ChatHeader
