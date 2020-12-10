import React, { useEffect, useState } from 'react'
import SVG from 'react-inlinesvg'
import classNames from 'classnames'
import { System_notification } from '@src/ts/enum/system_notification'
import plusIcon from '../../public/icons/plus.svg'
import photoIcon from '../../public/icons/photo.svg'
import glazIcon from '../../public/icons/eye.svg'
import tortIcon from '../../public/icons/kake.svg'
import speechIcon from '../../public/icons/speech-bubble.svg'

const PushCard = (props: {
  idx: number
  length: any
  id: any
  icon: any
  notification: any
  cardTypeColor: any
  action: any
}) => {
  const { icon, cardTypeColor, id, action, length, idx, fade, notification, imgSrc, text, descr, name } = props
  const userData = notification?.client || notification?.ambassador
  const [isRender, renderClass] = useState(false)
  const [isFadeOut, setFadeOut] = useState(false)

  const root = classNames('ava__append', {
    [`ava__append_color_${cardTypeColor}`]: cardTypeColor,
  })

  const card = classNames('push-card animated', {
    'animatedFadeInUp fadeInUp': length <= 5 && !isFadeOut,
    'animatedFadeOutUp fadeOutUp ': isFadeOut,
  })

  useEffect(() => {
    length > 5 && idx === 0 ? setFadeOut(true) : setFadeOut(false)
  }, [length])

  let out = ''

  const fadeOut = () => {
    if (fade && idx == 0) {
      out = 'push-card animated animatedFadeOutUp fadeOutUp '
    }
    out = 'push-card animated animatedFadeInUp fadeInUp'

    return out
  }

  return (
    <div className={card}>
      <div className="push-card__content">
        <div className="ava ava_online ava_photo">
          <img className="ava__img" src={`${process.env.API_IMG_URL}${userData?.avatar}`} alt="img" />
          <div className={root}>
            {notification.type === System_notification.TYPE_CONTACTS_NEW_PHOTO && <SVG src={photoIcon} />}
            {notification.type !== System_notification.TYPE_CONTACTS_NEW_VIDEO && <SVG src={plusIcon} />}
            {notification.type !== System_notification.TYPE_PERSONAL_PROFILE_VIEW && <SVG src={glazIcon} />}
            {notification.type !== System_notification.TYPE_CONTACTS_BIRTHDAY && <SVG src={tortIcon} />}
            {notification.type !== System_notification.TYPE_PERSONAL_PROFILE_COMMENT && <SVG src={speechIcon} />}
          </div>
        </div>
        <div className="push-card__wrap">
          <span className="push-card__title">{userData?.name}</span>
          {notification.type === System_notification.TYPE_CONTACTS_NEW_PHOTO && (
            <span className="push-card__text">Added new photo</span>
          )}
          {notification.type === System_notification.TYPE_CONTACTS_NEW_VIDEO && (
            <span className="push-card__text">Added new video</span>
          )}
          {notification.type === System_notification.TYPE_PERSONAL_PROFILE_VIEW && (
            <span className="push-card__text"> is viewing your profile right now</span>
          )}
          {notification.type === System_notification.TYPE_PERSONAL_PROFILE_COMMENT && (
            <span className="push-card__text">comment your profile</span>
          )}
        </div>
      </div>
      <div className="push-card__row">
        <div className="push-card__text">{descr}</div>
        {/* {action && <button className="btn">Reply {isRender}</button>} */}
      </div>
    </div>
  )
}

export default PushCard
